# VSCode Project Templates – User Extension

This VSCode extension allows authorized users to instantly initialize new projects from pre-approved templates. These templates are maintained by administrators and assigned to companies, ensuring each user only sees relevant options for their organization.

---

##  What It Does

- **Personalized access** to templates based on your email domain
- **Templates segmented by company** – you only see what’s meant for you
- **One-command setup**: choose a template, and it’s automatically downloaded and unzipped into your project folder
- **Secure and rate-limited**: downloads are restricted to one every 10 minutes to prevent misuse

---

## How It Works

1. **Open VSCode**
2. **Run the command**: `Initialize Project`
3. **Enter your professional email**
4. The extension queries the backend and shows you templates assigned to your company
5. **Pick one**, and it is automatically downloaded and extracted into your workspace

No tokens. No logins. Just a simple, fast onboarding to get started on your next project.

---

## Company-Specific Access

Your access is determined by your email. If you're registered in the system, your email is mapped to a company name. Each company has its own list of templates that only its users can see.

Example:

## Example Usage

- **User**: `mia@zenflow.io`  
- **Company**: Zenflow  
- **Available Templates**:
  - `zenflow-management-presentation.zip` – internal roadmap, KPIs, team planning
  - `zenflow-customer-demo-presentation.zip` – product pitch, customer onboarding
  - `zenflow-investor-deck.zip` – financials, vision, and traction for stakeholders


**Rate limit**: 1 download every minute per user

These templates are automatically suggested when Mia uses the extension with her Zenflow email.

Template Delivery
Templates are managed and stored in a remote bucket (Cloudflare R2) and served via a FastAPI backend. Each template is a .zip file and is extracted directly into your current workspace upon selection.

Who Manages This?
There is a separate VSCode admin extension for internal managers or team leads. They can:

- Upload new templates

- Add/remove users by email

- Assign templates to their own companies

- These admin actions are password protected 
This ensures users only access what they’re meant to – no more, no less.


Works on Windows, macOS, Linux

##  Why Use This?

Clean developer experience

Secure and controlled

Scalable across teams or departments

Easily maintainable

