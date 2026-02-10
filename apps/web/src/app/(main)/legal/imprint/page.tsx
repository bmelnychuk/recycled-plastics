'use client';

import { imprintData } from '@/features/legal/legal-data';
import { useLocalStorage } from 'usehooks-ts';

export default function ImprintPage() {
  const [language] = useLocalStorage('language', 'en', {
    serializer: (value) => value,
    deserializer: (value) => value,
  });
  return language === 'de' ? <GermanImprintPage /> : <EnglishImprintPage />;
}

const GermanImprintPage = () => {
  const { appName, provider, contact } = imprintData;

  return (
    <div>
      <h1>Impressum</h1>
      <p>
        <em>Zuletzt aktualisiert: 13. September 2025</em>
      </p>
      <section id="provider-info">
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          <strong>App/Website Name:</strong> {appName}
        </p>
        <p>
          <strong>Beschreibung:</strong> {appName} ist eine öffentliche
          Austauschplattform, auf der Nutzer Angebot und Nachfrage für
          recycelte Kunststoffe einstellen, miteinander handeln und auf
          aggregierte Marktdaten zugreifen können.
        </p>
      </section>

      <section id="provider-details">
        <h2>Anbieter</h2>
        <address>
          {provider.name}
          <br />
          {provider.addressLine1}
          <br />
          {provider.postalCode} {provider.city}
          <br />
          {provider.country}
        </address>
      </section>

      <section id="contact">
        <h2>Kontakt</h2>
        <p>
          <strong>E-Mail:</strong>{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      </section>

      <section id="content-responsibility">
        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <address>
          {provider.name}
          <br />
          {provider.addressLine1}
          <br />
          {provider.postalCode} {provider.city}
          <br />
          {provider.country}
        </address>
      </section>

      <section id="liability-disclaimer">
        <h2>Haftungsausschluss</h2>

        <h3>Haftung für Inhalte</h3>
        <p>
          Die Inhalte dieser App/Website werden mit größtmöglicher Sorgfalt
          erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der
          Inhalte kann jedoch keine Gewähr übernommen werden. Als
          Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
          diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Eine
          Verpflichtung zur Überwachung oder Prüfung von Informationen, die von
          Dritten übermittelt oder gespeichert werden, besteht nicht.
        </p>

        <h3>Haftung für Links</h3>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
          permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
          konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
        </p>

        <h3>Urheberrecht</h3>
        <p>
          Die durch den Betreiber erstellten Inhalte und Werke auf diesen Seiten
          unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als
          solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung
          und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
          bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw.
          Erstellers.
        </p>
      </section>
    </div>
  );
};

const EnglishImprintPage = () => {
  const { appName, provider, contact } = imprintData;

  return (
    <div>
      <h1>Imprint</h1>
      <p>
        <em>Last updated: September 13, 2025</em>
      </p>
      <section id="provider-info">
        <h2>Information according to § 5 TMG</h2>
        <p>
          <strong>App/Website Name:</strong> {appName}
        </p>
        <p>
          <strong>Description:</strong> {appName} is a public exchange platform
          where users can list supply and demand for recycled plastics,
          exchange with each other, and access aggregated market data.
        </p>
      </section>

      <section id="provider-details">
        <h2>Provider</h2>
        <address>
          {provider.name}
          <br />
          {provider.addressLine1}
          <br />
          {provider.postalCode} {provider.city}
          <br />
          {provider.country}
        </address>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>
          <strong>Email:</strong>{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      </section>

      <section id="content-responsibility">
        <h2>Responsible for content according to § 55 Abs. 2 RStV</h2>
        <address>
          {provider.name}
          <br />
          {provider.addressLine1}
          <br />
          {provider.postalCode} {provider.city}
          <br />
          {provider.country}
        </address>
      </section>

      <section id="liability-disclaimer">
        <h2>Liability Disclaimer</h2>

        <h3>Liability for Content</h3>
        <p>
          The content of this app/website is created with the greatest possible
          care. However, no guarantee can be given for the accuracy,
          completeness and timeliness of the content. As a service provider, we
          are responsible for our own content on these pages in accordance with
          § 7 para.1 TMG under general law. There is no obligation to monitor
          or check information transmitted or stored by third parties.
        </p>

        <h3>Liability for Links</h3>
        <p>
          Our offer contains links to external websites of third parties, on
          whose contents we have no influence. Therefore, we cannot assume any
          liability for these external contents. The respective provider or
          operator of the pages is always responsible for the content of the
          linked pages. The linked pages were checked for possible legal
          violations at the time of linking. Illegal content was not
          recognizable at the time of linking. However, permanent monitoring of
          the content of the linked pages is not reasonable without concrete
          evidence of a violation of the law.
        </p>

        <h3>Copyright</h3>
        <p>
          The content and works created by the operator on these pages are
          subject to German copyright law. Contributions by third parties are
          identified as such. The reproduction, editing, distribution and any
          kind of exploitation outside the limits of copyright require the
          written consent of the respective author or creator.
        </p>
      </section>
    </div>
  );
};
