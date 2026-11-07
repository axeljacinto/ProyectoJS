/**
 * Middleware para validar esquemas Zod en request (body, query, params).
 * @param {import('zod').ZodSchema} schema 
 * @param {'body' | 'query' | 'params'} target 
 */
export function validar(schema, target = 'body') {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req[target]);
      req[target] = parsed;
      next();
    } catch (error) {
      next(error);
    }
  };
}

