export function auditLog<T extends { format(): string }>(
  subject: T,
  action: string
) {
  console.log(`[${subject.format()}]: ${action}`);
}
