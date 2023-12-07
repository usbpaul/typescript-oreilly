import type {
  BankRoute,
  Entities,
  Jsonified,
  contextRoot,
} from '../shared/index.js';

type CorrespondingType<TRoute extends BankRoute> =
  TRoute extends `/${typeof contextRoot}/${infer EntityName}`
    ? EntityName extends keyof Entities
      ? Entities[EntityName]
      : never
    : never;
type SingularCorrespondingType<TRoute extends BankRoute> =
  CorrespondingType<TRoute> extends (infer T)[] ? T : CorrespondingType<TRoute>;

export async function get<TRoute extends BankRoute>(
  route: TRoute
): Promise<Jsonified<CorrespondingType<TRoute>>> {
  const response = await fetch(route);
  if (!response.ok) {
    throw new Error(`Response was not OK: ${response.status}`);
  }
  return response.json() as Promise<CorrespondingType<TRoute>>;
}

export async function post<TRoute extends BankRoute>(
  route: TRoute,
  body: SingularCorrespondingType<TRoute>
): Promise<void> {
  const response = await fetch(route, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Response was not OK: ${response.status}`);
  }
}
