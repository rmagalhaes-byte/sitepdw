interface LeadConfirmationProps {
  name: string;
  institution: string;
  siteUrl: string;
}

export function buildLeadConfirmationHtml({ name, institution, siteUrl }: LeadConfirmationProps): string {
  const logo      = `${siteUrl}/pdw_logo.png`;
  const tecminho  = `${siteUrl}/tcminho-logo.png`;
  const blockchain = `${siteUrl}/logo-Blockchain-pt.png`;
  const funders   = `${siteUrl}/financiadores-3logos.png`;

  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Pedido Recebido — Portuguese Digital Wallet</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#111118;border-radius:16px;border:1px solid #1e1e2e;overflow:hidden;">

          <!-- Header com logo PDW -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);padding:36px 48px 28px;text-align:center;border-bottom:1px solid rgba(37,99,235,0.2);">
              <img src="${logo}" alt="Portuguese Digital Wallet" width="180" style="display:block;margin:0 auto 20px;max-width:180px;height:auto;" />
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#f1f5f9;line-height:1.3;">Pedido recebido com sucesso</h1>
            </td>
          </tr>

          <!-- Corpo -->
          <tr>
            <td style="padding:36px 48px;">
              <p style="margin:0 0 14px;font-size:16px;color:#94a3b8;line-height:1.6;">Olá <strong style="color:#f1f5f9;">${name}</strong>,</p>
              <p style="margin:0 0 20px;font-size:16px;color:#94a3b8;line-height:1.6;">
                Registámos o pedido da <strong style="color:#f1f5f9;">${institution}</strong> para integração com a
                <strong style="color:#60a5fa;">Portuguese Digital Wallet</strong>.
              </p>
              <p style="margin:0 0 28px;font-size:16px;color:#94a3b8;line-height:1.6;">
                A nossa equipa irá entrar em contacto <strong style="color:#f1f5f9;">no prazo de 48 horas</strong>
                para agendar uma sessão de demonstração personalizada.
              </p>

              <!-- Próximos passos -->
              <table cellpadding="0" cellspacing="0" width="100%" style="background:rgba(37,99,235,0.05);border:1px solid rgba(37,99,235,0.2);border-radius:12px;margin-bottom:28px;">
                <tr>
                  <td style="padding:22px 24px;">
                    <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#60a5fa;text-transform:uppercase;letter-spacing:0.1em;">O que acontece a seguir</p>
                    <p style="margin:0 0 8px;font-size:14px;color:#94a3b8;line-height:1.5;">
                      <span style="color:#3b82f6;font-weight:700;margin-right:8px;">01</span>A equipa PDW analisa o seu perfil institucional
                    </p>
                    <p style="margin:0 0 8px;font-size:14px;color:#94a3b8;line-height:1.5;">
                      <span style="color:#3b82f6;font-weight:700;margin-right:8px;">02</span>Agendamos uma sessão de demonstração personalizada
                    </p>
                    <p style="margin:0;font-size:14px;color:#94a3b8;line-height:1.5;">
                      <span style="color:#3b82f6;font-weight:700;margin-right:8px;">03</span>Definimos um plano de piloto para a sua instituição
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Logos parceiros -->
          <tr>
            <td style="padding:20px 48px;border-top:1px solid #1e1e2e;text-align:center;">
              <p style="margin:0 0 14px;font-size:11px;color:#475569;text-transform:uppercase;letter-spacing:0.08em;">Parceiros do ecossistema</p>
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="padding:0 16px;vertical-align:middle;">
                    <img src="${tecminho}" alt="TecMinho" height="32" style="display:block;height:32px;max-width:120px;width:auto;" />
                  </td>
                  <td style="padding:0 16px;vertical-align:middle;border-left:1px solid #1e1e2e;">
                    <img src="${blockchain}" alt="Blockchain.PT" height="28" style="display:block;height:28px;max-width:140px;width:auto;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Financiadores -->
          <tr>
            <td style="padding:16px 48px 28px;text-align:center;background:#0d0d14;">
              <p style="margin:0 0 10px;font-size:10px;color:#334155;text-transform:uppercase;letter-spacing:0.06em;">Financiamento</p>
              <img src="${funders}" alt="Financiado por PRR, República Portuguesa e NextGenerationEU" width="240" style="display:block;margin:0 auto;max-width:240px;height:auto;opacity:0.7;" />
              <p style="margin:10px 0 0;font-size:11px;color:#334155;">TecMinho — Campus de Azurém, Guimarães, Portugal</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
