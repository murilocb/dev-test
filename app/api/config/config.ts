import neo4j from "neo4j-driver";

interface Step {
  id: string;
  title: string;
  content: string;
}

export const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "1234!Murilo")
);

async function initializeDatabase() {
  const session = driver.session();
  const queries = [
    "CREATE (s:Step { id: 'step-1', title: 'O primeiro passo', content: 'O conteúdo do primeiro passo' })",
    "CREATE (t:Trail { id: 'trail-1', title: 'A primeira trilha' })",
    "CREATE (tm:Theme { id: 'theme-1', title: 'O primeiro tema' })",
    "CREATE (a:Academy { id: 'academy-1', title: 'A primeira academia' })",
    "MATCH (t:Trail {id: 'trail-1'}), (s:Step {id: 'step-1'}) CREATE (t)-[:HAS_STEP]->(s)",
    "MATCH (tm:Theme {id: 'theme-1'}), (t:Trail {id: 'trail-1'}) CREATE (tm)-[:HAS_TRAIL]->(t)",
    "MATCH (a:Academy {id: 'academy-1'}), (tm:Theme {id: 'theme-1'}) CREATE (a)-[:HAS_THEME]->(tm)",
  ];

  try {
    for (const query of queries) {
      await session.run(query);
    }
    console.log("Nodes and relationships created successfully.");
  } catch (error) {
    console.error("Error creating nodes and relationships:", error);
  } finally {
    await session.close();
  }
}

export async function createStep(
  id: string,
  title: string,
  content: string
): Promise<void> {
  const session = driver.session();
  try {
    await session.run(
      "CREATE (s:Step { id: $id, title: $title, content: $content })",
      { id, title, content }
    );
    console.log("Step created successfully.");
  } catch (error) {
    console.error("Error creating step:", error);
  } finally {
    await session.close();
  }
}

export async function getAllSteps(): Promise<Step[]> {
  const session = driver.session();
  try {
    const result = await session.run(
      "MATCH (s:Step) RETURN s ORDER BY s.id ASC"
    );
    const steps = result.records.map(
      (record) => record.get("s").properties as Step
    );
    return steps;
  } catch (error) {
    console.error("Error retrieving steps:", error);
    return [];
  } finally {
    await session.close();
  }
}

export async function getAllStepsByTrailId(trailId: string): Promise<Step[]> {
  const session = driver.session();
  try {
    const result = await session.run(
      "MATCH (s:Step { id: $trailId }) RETURN s ORDER BY s.id ASC",
      { trailId }
    );
    const steps = result.records.map(
      (record) => record.get("s").properties as Step
    );
    return steps;
  } catch (error) {
    console.error("Error retrieving steps for trail:", error);
    return [];
  } finally {
    await session.close();
  }
}

(async () => {
  await initializeDatabase();
})();
