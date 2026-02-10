'use client';

import { imprintData } from '@/features/legal/legal-data';
import { useLocalStorage } from 'usehooks-ts';

export default function PrivacyPage() {
  const [language] = useLocalStorage('language', 'en', {
    serializer: (value) => value,
    deserializer: (value) => value,
  });
  return language === 'de' ? <GermanPrivacyPage /> : <EnglishPrivacyPage />;
}
const GermanPrivacyPage = () => {
  const { appName, contact } = imprintData;

  return (
    <div>
      <h1>Datenschutzerklärung</h1>
      <section id="introduction">
        <h2>1. Einleitung</h2>
        <p>
          Wir respektieren Ihre Privatsphäre und verpflichten uns zum Schutz
          Ihrer personenbezogenen Daten. Diese Datenschutzerklärung erklärt, wie{' '}
          <strong>{appName}</strong> ("wir", "uns" oder "unser")
          personenbezogene Daten sammelt, verwendet, speichert und schützt, wenn
          Sie unsere Anwendung und zugehörigen Dienste nutzen. Wir verarbeiten
          personenbezogene Daten in Übereinstimmung mit der
          EU-Datenschutz-Grundverordnung (DSGVO) und anderen anwendbaren
          Gesetzen.
        </p>
      </section>

      <section id="who-we-are">
        <h2>2. Wer wir sind</h2>
        <p>
          {appName} ist eine öffentliche Austauschplattform, auf der Nutzer
          Angebot und Nachfrage für recycelte Kunststoffe einstellen,
          miteinander handeln und auf aggregierte Marktdaten zugreifen können.{' '}
          {appName} wird von der Firma {appName} mit Sitz in Deutschland
          entwickelt und betrieben. Wenn Sie Fragen zu dieser
          Datenschutzerklärung oder Ihren Daten haben, kontaktieren Sie uns
          bitte über die Kontaktdaten im Abschnitt{' '}
          <a href="#contact">Kontaktinformationen</a>.
        </p>
      </section>

      <section id="data-collected">
        <h2>3. Erhobene Daten</h2>
        <p>Wir erfassen folgende Kategorien personenbezogener Daten:</p>
        <ul>
          <li>
            <strong>Kontoinformationen:</strong> Name und E-Mail-Adresse.
          </li>
          <li>
            <strong>Nutzerdaten:</strong> die Daten, die Sie in die Plattform
            eingeben, einschließlich Angebots- und Nachfrageeinträge für
            recycelte Kunststoffe.
          </li>
          <li>
            <strong>Technische und Nutzungsdaten:</strong> Gerätetyp,
            Browser-Informationen und Interaktionsdaten, die über Analysedienste
            erfasst werden (siehe "Drittanbieterdienste").
          </li>
        </ul>
        <p>
          Wir erfassen nicht absichtlich Informationen von Kindern. Siehe{' '}
          <a href="#children">Datenschutz für Kinder</a>.
        </p>
      </section>

      <section id="how-we-use-data">
        <h2>4. Wie wir Daten verwenden</h2>
        <p>Wir verwenden personenbezogene Daten für folgende Zwecke:</p>
        <ul>
          <li>
            Um den {appName}-Service und die von Ihnen angeforderten Funktionen
            bereitzustellen und zu betreiben.
          </li>
          <li>
            Um auf Ihre Support-Anfragen zu antworten und über Ihr Konto zu
            kommunizieren.
          </li>
          <li>
            Um die Nutzung zu analysieren und die App und ihre Funktionen zu
            verbessern.
          </li>
          <li>
            Um gesetzlichen Verpflichtungen nachzukommen und unsere Rechte zu
            schützen.
          </li>
        </ul>
        <p>
          Wir versenden keine Newsletter oder Marketing-E-Mails, es sei denn,
          Sie haben sich ausdrücklich für solche Mitteilungen angemeldet.
        </p>
      </section>

      <section id="legal-basis">
        <h2>5. Rechtsgrundlage für die Verarbeitung</h2>
        <p>
          Gemäß der DSGVO stützen wir uns je nach Verarbeitungsaktivität auf
          folgende Rechtsgrundlagen:
        </p>
        <ul>
          <li>
            <strong>Vertragserfüllung:</strong> Verarbeitung, die zur
            Bereitstellung des von Ihnen angeforderten Dienstes erforderlich
            ist.
          </li>
          <li>
            <strong>Berechtigte Interessen:</strong> zum Beispiel
            Produktverbesserung, Analytik und Betrugsprävention, sofern diese
            Interessen nicht durch Ihre Rechte und Interessen überwogen werden.
          </li>
          <li>
            <strong>Gesetzliche Verpflichtung:</strong> wenn wir Daten
            verarbeiten müssen, um gesetzlichen Anforderungen zu entsprechen.
          </li>
          <li>
            <strong>Einwilligung:</strong> wo erforderlich (für optionale
            Analysen oder Tracking), und Sie können die Einwilligung jederzeit
            widerrufen.
          </li>
        </ul>
      </section>

      <section id="third-party">
        <h2>6. Drittanbieterdienste</h2>
        <p>
          Wir nutzen vertrauenswürdige Drittanbieter, um den Service zu
          betreiben. Aktuelle Beispiele sind:
        </p>
        <ul>
          <li>
            <strong>Amazon Web Services (AWS)</strong> - Hosting und
            Datenspeicherung. Daten werden nach Möglichkeit in AWS-Rechenzentren
            innerhalb der EU gespeichert.
          </li>
          <li>
            <strong>Mixpanel</strong> - Analytik. Mixpanel kann Nutzungsdaten
            erfassen und einige Daten auf Server außerhalb des EWR übertragen
            (z.B. in die Vereinigten Staaten). Datenübertragungen unterliegen
            Schutzmaßnahmen wie den Standardvertragsklauseln der Europäischen
            Kommission. Siehe{' '}
            <a
              href="https://mixpanel.com/legal/privacy-policy/"
              target="_blank"
              rel="noreferrer"
            >
              Mixpanels Datenschutzerklärung
            </a>
            .
          </li>
        </ul>
        <p>
          Jeder Anbieter hat seine eigene Datenschutzerklärung und agiert als
          separater Verantwortlicher oder Auftragsverarbeiter von Daten. Wir
          verwenden Datenverarbeitungsvereinbarungen und andere geeignete
          Schutzmaßnahmen mit unseren Anbietern, wo dies gesetzlich
          vorgeschrieben ist.
        </p>
      </section>

      <section id="data-transfers">
        <h2>7. Datenübertragungen</h2>
        <p>
          Während wir versuchen, Daten innerhalb des Europäischen
          Wirtschaftsraums (EWR) zu halten, können einige Drittanbieterdienste
          Daten außerhalb des EWR übertragen. Wenn personenbezogene Daten in
          Länder ohne Angemessenheitsbeschluss der Europäischen Kommission
          übertragen werden, implementieren wir geeignete Schutzmaßnahmen (wie
          Standardvertragsklauseln), um ein angemessenes Schutzniveau zu
          gewährleisten.
        </p>
      </section>

      <section id="data-retention">
        <h2>8. Datenspeicherung</h2>
        <p>
          Wir speichern Ihre personenbezogenen Daten, solange Ihr Konto aktiv
          ist. Wenn Ihr Konto länger als 24 Monate inaktiv bleibt, können wir es
          zusammen mit Ihren Daten löschen. Sie können auch jederzeit eine
          Löschung beantragen. Wir können bestimmte Daten aufbewahren, wenn dies
          gesetzlich vorgeschrieben ist oder zur Beilegung von Streitigkeiten
          erforderlich ist.
        </p>
      </section>

      <section id="cookies">
        <h2>9. Cookies und Tracking-Technologien</h2>
        <p>
          Wir setzen nicht direkt Cookies. Allerdings können
          Drittanbieter-Analysedienste wie Mixpanel Cookies oder ähnliche
          Tracking-Technologien verwenden, um Nutzungsinformationen zu sammeln.
          Falls gesetzlich vorgeschrieben, werden wir um Ihre Einwilligung
          bitten, bevor solche Technologien verwendet werden. Sie können Cookies
          über Ihre Browsereinstellungen blockieren oder löschen, dies kann
          jedoch die Funktionalität des Dienstes beeinträchtigen.
        </p>
      </section>

      <section id="user-rights">
        <h2>10. Ihre Rechte</h2>
        <p>
          Gemäß der DSGVO haben Sie folgende Rechte in Bezug auf Ihre
          personenbezogenen Daten:
        </p>
        <ul>
          <li>
            Auskunftsrecht — Sie können Zugang zu den personenbezogenen Daten
            verlangen, die wir über Sie speichern.
          </li>
          <li>
            Recht auf Berichtigung — Sie können uns bitten, ungenaue oder
            unvollständige Daten zu korrigieren.
          </li>
          <li>
            Recht auf Löschung ("Recht auf Vergessenwerden") — Sie können unter
            bestimmten Umständen die Löschung Ihrer personenbezogenen Daten
            verlangen.
          </li>
          <li>
            Recht auf Einschränkung der Verarbeitung — Sie können in bestimmten
            Situationen die Einschränkung der Verarbeitung Ihrer Daten
            verlangen.
          </li>
          <li>
            Recht auf Datenübertragbarkeit — Sie können eine Kopie Ihrer Daten
            in einem strukturierten, gängigen, maschinenlesbaren Format
            anfordern.
          </li>
          <li>
            Widerspruchsrecht — Sie können der Verarbeitung auf Grundlage
            berechtigter Interessen oder für Direktmarketing widersprechen.
          </li>
          <li>
            Recht auf Widerruf der Einwilligung — wenn die Verarbeitung auf
            Einwilligung basiert, können Sie die Einwilligung jederzeit
            widerrufen.
          </li>
          <li>
            Beschwerderecht — Sie können sich bei Ihrer örtlichen
            Datenschutzbehörde beschweren. In Deutschland ist unsere zuständige
            Behörde der{' '}
            <a
              href="https://datenschutz-hamburg.de/"
              target="_blank"
              rel="noreferrer"
            >
              Hamburgische Beauftragte für Datenschutz und Informationsfreiheit
            </a>
            .
          </li>
        </ul>
        <p>
          Um eines dieser Rechte auszuüben, kontaktieren Sie uns bitte unter der
          Adresse im Abschnitt <a href="#contact">Kontaktinformationen</a>. Wir
          werden gemäß den geltenden Gesetzen antworten.
        </p>
      </section>

      <section id="security">
        <h2>11. Sicherheit</h2>
        <p>
          Wir setzen angemessene technische und organisatorische Maßnahmen um,
          um personenbezogene Daten vor versehentlicher oder unrechtmäßiger
          Zerstörung, Verlust, Veränderung, unbefugter Offenlegung oder Zugriff
          zu schützen. Allerdings ist keine Übertragungsmethode oder
          elektronische Speicherung vollständig sicher; absolute Sicherheit kann
          nicht garantiert werden.
        </p>
      </section>

      <section id="children">
        <h2>12. Datenschutz für Kinder</h2>
        <p>
          Unsere Dienste richten sich nicht an Kinder. Wir erfassen nicht
          wissentlich personenbezogene Daten von Personen unter dem Mindestalter
          für digitale Einwilligung in ihrem Land (typischerweise zwischen 13
          und 16 Jahren). Wenn Sie ein Elternteil oder Vormund sind und glauben,
          dass Ihr Kind uns personenbezogene Daten zur Verfügung gestellt hat,
          kontaktieren Sie uns bitte, um die Löschung zu beantragen.
        </p>
      </section>

      <section id="contact">
        <h2>13. Kontaktinformationen</h2>
        <p>
          Wenn Sie Fragen zu dieser Datenschutzerklärung haben oder Ihre Rechte
          ausüben möchten, kontaktieren Sie uns bitte:
        </p>
        <ul>
          <li>
            <strong>E-Mail:</strong>{' '}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
        </ul>
        <p>
          Wir werden auf datenschutzbezogene Anfragen gemäß den geltenden
          Gesetzen antworten.
        </p>
      </section>

      <section id="changes">
        <h2>14. Änderungen dieser Datenschutzerklärung</h2>
        <p>
          Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren.
          Wenn wir Änderungen vornehmen, werden wir das Datum "Zuletzt
          aktualisiert" oben auf dieser Seite aktualisieren. Wesentliche
          Änderungen werden kommuniziert, sofern dies gesetzlich vorgeschrieben
          ist.
        </p>
      </section>
    </div>
  );
};

const EnglishPrivacyPage = () => {
  const { appName, contact } = imprintData;

  return (
    <div>
      <h1>Privacy Policy</h1>
      <section id="introduction">
        <h2>1. Introduction</h2>
        <p>
          We respect your privacy and are committed to protecting your personal
          data. This Privacy Policy explains how <strong>{appName}</strong>{' '}
          ("we", "us" or "our") collects, uses, stores and protects personal
          information when you use our application and related services. We
          process personal data in accordance with the EU General Data
          Protection Regulation (GDPR) and other applicable laws.
        </p>
      </section>

      <section id="who-we-are">
        <h2>2. Who we are</h2>
        <p>
          {appName} is a public exchange platform where users can list supply
          and demand for recycled plastics, exchange with each other, and access
          aggregated market data. {appName} is developed and operated by{' '}
          {appName}, a company based in Germany. If you have questions about
          this Privacy Policy or your data, please contact us using the contact
          details in the{' '}
          <a href="#contact">Contact Information</a> section.
        </p>
      </section>

      <section id="data-collected">
        <h2>3. Data We Collect</h2>
        <p>We collect the following categories of personal data:</p>
        <ul>
          <li>
            <strong>Account information:</strong> name and email address.
          </li>
          <li>
            <strong>User content:</strong> the data you enter into the platform,
            including supply and demand listings for recycled plastics.
          </li>
          <li>
            <strong>Technical and usage data:</strong> device type, browser
            information and interaction data collected through analytics
            services (see "Third-Party Services").
          </li>
        </ul>
        <p>
          We do not intentionally collect information from children. See{' '}
          <a href="#children">Children's Privacy</a>.
        </p>
      </section>

      <section id="how-we-use-data">
        <h2>4. How We Use Data</h2>
        <p>We use personal data for the following purposes:</p>
        <ul>
          <li>
            To provide and operate the {appName} service and features you
            request.
          </li>
          <li>
            To respond to your support requests and communicate about your
            account.
          </li>
          <li>To analyze usage and improve the app and its features.</li>
          <li>To comply with legal obligations and protect our rights.</li>
        </ul>
        <p>
          We do not send newsletters or marketing emails unless you explicitly
          opt in to such communications.
        </p>
      </section>

      <section id="legal-basis">
        <h2>5. Legal Basis for Processing</h2>
        <p>
          Under the GDPR, we rely on the following legal bases depending on the
          processing activity:
        </p>
        <ul>
          <li>
            <strong>Performance of a contract:</strong> processing necessary to
            provide the service you requested.
          </li>
          <li>
            <strong>Legitimate interests:</strong> for example product
            improvement, analytics and fraud prevention, where those interests
            are not overridden by your rights and interests.
          </li>
          <li>
            <strong>Legal obligation:</strong> where we must process data to
            comply with the law.
          </li>
          <li>
            <strong>Consent:</strong> where required (for optional analytics or
            tracking), and you may withdraw consent at any time.
          </li>
        </ul>
      </section>

      <section id="third-party">
        <h2>6. Third-Party Services</h2>
        <p>
          We use trusted third-party providers to operate the service. Current
          examples include:
        </p>
        <ul>
          <li>
            <strong>Amazon Web Services (AWS)</strong> - hosting and data
            storage. Data is stored in AWS data centers within the EU where
            possible.
          </li>
          <li>
            <strong>Mixpanel</strong> - analytics. Mixpanel may collect usage
            data and may transfer some data to servers located outside the EEA
            (for example, the United States). Data transfers are subject to
            safeguards such as the European Commission's Standard Contractual
            Clauses. See{' '}
            <a
              href="https://mixpanel.com/legal/privacy-policy/"
              target="_blank"
              rel="noreferrer"
            >
              Mixpanel's Privacy Policy
            </a>
            .
          </li>
        </ul>
        <p>
          Each provider has its own privacy policy and acts as a separate
          controller or processor of data. We use data processing agreements and
          other appropriate safeguards with our providers where required by law.
        </p>
      </section>

      <section id="data-transfers">
        <h2>7. Data Transfers</h2>
        <p>
          While we try to keep data within the European Economic Area (EEA),
          some third-party services may transfer data outside the EEA. When
          personal data is transferred to countries without an adequacy decision
          from the European Commission, we implement appropriate safeguards
          (such as Standard Contractual Clauses) to ensure an adequate level of
          protection.
        </p>
      </section>

      <section id="data-retention">
        <h2>8. Data Retention</h2>
        <p>
          We retain your personal data for as long as your account is active. If
          your account remains inactive for more than 24 months, we may delete
          it along with your data. You can also request deletion at any time. We
          may retain certain data if required by law or to resolve disputes.
        </p>
      </section>

      <section id="cookies">
        <h2>9. Cookies and Tracking Technologies</h2>
        <p>
          We do not set cookies directly. However, third-party analytics
          providers such as Mixpanel may use cookies or similar tracking
          technologies to collect usage information. If required by law, we will
          ask for your consent before such technologies are used. You can block
          or delete cookies through your browser settings, but this may affect
          the functionality of the service.
        </p>
      </section>

      <section id="user-rights">
        <h2>10. Your Rights</h2>
        <p>
          Under the GDPR you have the following rights concerning your personal
          data:
        </p>
        <ul>
          <li>
            Right of access — you can request access to the personal data we
            hold about you.
          </li>
          <li>
            Right to rectification — you can ask us to correct inaccurate or
            incomplete data.
          </li>
          <li>
            Right to erasure ("right to be forgotten") — you can request
            deletion of your personal data in certain circumstances.
          </li>
          <li>
            Right to restriction of processing — you can request the restriction
            of processing of your data in certain situations.
          </li>
          <li>
            Right to data portability — you can request a copy of your data in a
            structured, commonly used, machine-readable format.
          </li>
          <li>
            Right to object — you can object to processing based on legitimate
            interests or for direct marketing.
          </li>
          <li>
            Right to withdraw consent — where processing is based on consent,
            you may withdraw consent at any time.
          </li>
          <li>
            Right to lodge a complaint — you may complain to your local data
            protection authority. In Germany, our competent authority is the{' '}
            <a
              href="https://datenschutz-hamburg.de/"
              target="_blank"
              rel="noreferrer"
            >
              Hamburg Commissioner for Data Protection and Freedom of
              Information
            </a>
            .
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at the address in
          the <a href="#contact">Contact Information</a> section. We will
          respond in accordance with applicable law.
        </p>
      </section>

      <section id="security">
        <h2>11. Security</h2>
        <p>
          We implement reasonable technical and organizational measures to
          protect personal data against accidental or unlawful destruction,
          loss, alteration, unauthorized disclosure or access. However, no
          method of transmission or electronic storage is completely secure;
          absolute security cannot be guaranteed.
        </p>
      </section>

      <section id="children">
        <h2>12. Children's Privacy</h2>
        <p>
          Our services are not directed at children. We do not knowingly collect
          personal data from anyone under the minimum age of digital consent in
          their country (typically between 13 and 16). If you are a parent or
          guardian and believe that your child has provided us with personal
          data, please contact us to request deletion.
        </p>
      </section>

      <section id="contact">
        <h2>13. Contact Information</h2>
        <p>
          If you have questions about this Privacy Policy or wish to exercise
          your rights, please contact us:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
        </ul>
        <p>
          We will respond to privacy-related requests in accordance with
          applicable law.
        </p>
      </section>

      <section id="changes">
        <h2>14. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we make
          changes, we will update the "Last updated" date at the top of this
          page. Significant changes will be communicated where required by law.
        </p>
      </section>
    </div>
  );
};
