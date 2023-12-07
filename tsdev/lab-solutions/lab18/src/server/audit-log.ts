export function auditLog<T extends { format(): string }>(
  originalMethod: (val: T) => unknown,
  context: ClassMethodDecoratorContext
) {
  const methodName = String(context.name);
  function replacementMethod(this: any, thing: T) {
    const result = originalMethod.call(this, thing);
    console.log(`[${thing.format()}]: ${methodName}`);
    return result;
  }
  return replacementMethod;
}
