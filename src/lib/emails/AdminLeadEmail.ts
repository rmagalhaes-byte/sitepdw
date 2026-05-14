interface AdminLeadProps {
  name: string;
  institution: string;
  email: string;
  subject?: string;
  message: string;
  siteUrl: string;
}

function field(label: string, value: string): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
    <tr>
      <td style="padding:12px 16px;background:#0d1117;border-radius:8px;border:1px solid #30363d;">
        <div style="font-size:11px;font-weight:600;color:#8b949e;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">${label}</div>
        <div style="font-size:14px;color:#c9d1d9;line-height:1.5;">${value}</div>
      </td>
    </tr>
  </table>`;
}

export function buildAdminLeadHtml({ name, institution, email, subject, message, siteUrl }: AdminLeadProps): string {
  const now     = new Date().toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon', dateStyle: 'full', timeStyle: 'short' });
  const logo    = `${siteUrl}/pdw_logo.png`;
  const funders = `${siteUrl}/financiadores-3logos.png`;

  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <title>Novo Lead PDW — ${name}</title>
</head>
<body style="margin:0;padding:0;background-color:#0d1117;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#161b22;border-radius:12px;border:1px solid #30363d;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#0d1117;padding:20px 32px;border-bottom:1px solid #30363d;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <img src="${logo}" alt="PDW" height="30" style="display:block;height:30px;width:auto;max-width:140px;" />
                  </td>
                  <td style="vertical-align:middle;text-align:right;">
                    <span style="background:#238636;color:#fff;font-size:11px;font-weight:700;padding:3px 10px;border-radius:12px;text-transform:uppercase;letter-spacing:0.05em;">Novo Lead</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Identificação do lead -->
          <tr>
            <td style="padding:20px 32px 8px;background:#0d1117;border-bottom:1px solid #21262d;">
              <h2 style="margin:0 0 4px;font-size:20px;font-weight:700;color:#e6edf3;">${name}</h2>
              <p style="margin:0 0 6px;font-size:14px;color:#8b949e;">${institution}</p>
              <p style="margin:0;font-size:12px;color:#6e7681;">${now}</p>
            </td>
          </tr>

          <!-- Dados do formulário -->
          <tr>
            <td style="padding:20px 32px;">
              ${field('Email', `<a href="mailto:${email}" style="color:#58a6ff;text-decoration:none;">${email}</a>`)}
              ${field('Instituição', institution)}
              ${field('Assunto', subject ? subject : '<em style="color:#8b949e;">Não especificado</em>')}
              ${field('Mensagem', `<span style="white-space:pre-wrap;">${message}</span>`)}
            </td>
          </tr>

          <!-- Financiadores + footer -->
          <tr>
            <td style="padding:16px 32px 20px;border-top:1px solid #30363d;background:#0d1117;text-align:center;">
              <img src="${funders}" alt="PRR · República Portuguesa · NextGenerationEU" width="180" style="display:block;margin:0 auto 10px;max-width:180px;height:auto;opacity:0.5;" />
              <p style="margin:0;font-size:11px;color:#6e7681;">Lead guardado em pdw.db · Agenda Blockchain.PT</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
