import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as unzipper from "unzipper";

const API_BASE_URL = "https://marp-tools-d41d7858c80b.herokuapp.com"; // Change if deployed

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("extension.initialiserProjet", async () => {
    const email = await vscode.window.showInputBox({
      prompt: "Entrez votre adresse email pour accéder aux templates",
      validateInput: (value) => value.includes("@") ? null : "Adresse email invalide"
    });
    if (!email) return;

    try {
      const templates = await getTemplates(email);
      if (templates.length === 0) {
        vscode.window.showErrorMessage("Aucun template disponible pour cette adresse email.");
        return;
      }

      let chosenTemplate = templates[0];
      if (templates.length > 1) {
        const picked = await vscode.window.showQuickPick(templates, { placeHolder: "Choisissez un template" });
        if (!picked) return;
        chosenTemplate = picked;
      }

      await downloadAndExtractTemplate(chosenTemplate, email);
      vscode.window.showInformationMessage(`Le template '${chosenTemplate}' a été installé avec succès.`);
    } catch (err: any) {
      vscode.window.showErrorMessage(err.message || "Erreur lors de l'initialisation du projet.");
    }
  });

  context.subscriptions.push(disposable);
}

async function getTemplates(email: string): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/user/get_templates?email=${encodeURIComponent(email)}`, {
    method: "POST"
  });
  if (!res.ok) throw new Error("Échec de récupération des templates. Email peut-être non autorisé.");
  const data = await res.json() as { templates: string[] };
  return data.templates;
}


async function downloadAndExtractTemplate(template: string, email: string) {
  const zipUrl = `${API_BASE_URL}/user/download/${template}?email=${encodeURIComponent(email)}`;

  const zipResponse = await fetch(zipUrl);
  if (!zipResponse.ok) throw new Error("Erreur de téléchargement du template. Peut-être limité à 1 téléchargement par 10 min.");
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    throw new Error("Aucun dossier de projet ouvert dans VSCode.");
  }
  const targetDir = workspaceFolders[0].uri.fsPath;

  const tempPath = path.join(targetDir, "template_temp.zip");
  const buffer = await zipResponse.arrayBuffer();
  fs.writeFileSync(tempPath, Buffer.from(buffer));

  await fs.createReadStream(tempPath)
    .pipe(unzipper.Extract({ path: targetDir }))
    .promise();

  fs.unlinkSync(tempPath);
}

export function deactivate() {}