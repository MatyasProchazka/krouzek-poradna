// ============================================================================
// Stránka /skola – přehled organizace (tenantu)
// ----------------------------------------------------------------------------
// Typická "nastavení workspace" v SaaS aplikacích (Slack, Notion, Teams…):
// kdo je členem, jaký je tarif, jak pozvat další lidi.
// ============================================================================

import { getCurrentUser } from "@/lib/auth";
import { getOrganization, countMembers, PLANS } from "@/lib/organizations";
import { ROLES } from "@/lib/permissions";
import ActionButton from "@/components/ActionButton";

export const metadata = { title: "Moje škola" };
export const dynamic = "force-dynamic";

export default async function OrganizationPage() {
  const user = await getCurrentUser(); // přihlášení hlídá middleware
  const org = getOrganization(user.organizationId);
  const members = countMembers(org.id);
  const plan = PLANS[org.plan];
  const isLektor = user.role === "lektor";

  return (
    <section className="card narrow">
      <h2>{org.name}</h2>

      <dl className="facts">
        <dt>Tvoje role</dt>
        <dd>{ROLES[user.role]}</dd>
        <dt>Tarif</dt>
        <dd>{plan.name}</dd>
        <dt>Členové</dt>
        <dd>
          {members} / {plan.maxMembers}
          {/* <meter> je sémantický ukazatel zaplnění */}
          <meter min={0} max={plan.maxMembers} value={members} />
        </dd>
      </dl>

      {/* Kód pozvánky vidí jen lektor. Student by ho mohl rozeslat komukoli. */}
      {isLektor && (
        <>
          <h3>Pozvat studenty</h3>
          <p className="muted">Pošli studentům tenhle kód. Zadají ho při registraci.</p>
          <p className="invite-code">{org.inviteCode}</p>
          <ActionButton url="/api/organization/invite" confirmText="Starý kód přestane fungovat. Pokračovat?">
            Vygenerovat nový kód
          </ActionButton>
        </>
      )}
    </section>
  );
}
