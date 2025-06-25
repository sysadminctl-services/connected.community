import { PageSection, Title } from '@patternfly/react-core';

export function DashboardPage() {
  return (
    <>
      <PageSection variant="default">
        <Title headingLevel="h1">Dashboard</Title>
      </PageSection>
      <PageSection>
        <p>¡Bienvenido! Has iniciado sesión correctamente.</p>
      </PageSection>
    </>
  );
}