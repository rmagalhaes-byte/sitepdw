import { Locale } from "@/i18n/config";

interface PdwFooterProps {
  lang: Locale;
  dict: any;
}

export function PdwFooter({ lang, dict }: PdwFooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p style={{ margin: '0 0 4px', fontWeight: 600 }}>Portuguese Digital Wallet</p>
            <p style={{ margin: 0 }}>{dict.footer.address}</p>
            <p style={{ margin: 0 }}>{dict.footer.email}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0 }}>{dict.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
