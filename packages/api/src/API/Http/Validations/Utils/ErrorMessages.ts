export const codeErrors = {
  HTTP: {
    BAD_REQUEST: {
      code: 'BAD_REQUEST',
      href: 'www.example.com/#BAD_REQUEST',
    },
    UNPROCESSABLE_ENTITY: {
      code: 'UNPROCESSABLE_ENTITY',
      href: 'www.example.com/#UNPROCESSABLE_ENTITY',
    },
    UNAUTHORIZED: {
      code: 'UNAUTHORIZED',
      href: 'www.example.com/#UNAUTHORIZED',
    },
    FORBIDDEN: {
      code: 'FORBIDDEN',
      href: 'www.example.com/#FORBIDDEN',
    },
    NOT_FOUND: {
      code: 'NOT_FOUND',
      href: 'www.example.com/#NOT_FOUND',
    },
    INTERNAL_ERROR: {
      code: 'INTERNAL_ERROR',
      href: 'www.example.com/#INTERNAL_ERROR',
    },
  },
  EMPTY: {
    code: 'E0000',
    message: 'El valor no puede estar vacío',
  },
  REQUIRED: {
    code: 'E0001',
    message: 'El valor es requerido',
  },
  STRING: {
    code: 'T0000',
    message: 'El valor debe ser de tipo: string',
    ATTRIBUTES: {
      MIN: {
        code: 'T0000-1',
        message: 'El valor debe tener al menos',
      },
      MAX: {
        code: 'T0000-2',
        message: 'El valor puede tener como máximo',
      },
      EMAIL: {
        code: 'T0000-3',
        message: 'El valor debe ser de tipo: email',
      },
      PASSWORD_MATCH: {
        code: 'T0000-4',
        message: 'El primer valor no coincide con el segundo',
      },
      REGEX: {
        code: 'T0000-5',
        message: 'El valor no posee el patrón correcto',
      },
    },
  },
  NUMBER: {
    code: 'T0001',
    message: 'El valor debe ser de tipo: number',
    ATTRIBUTES: {
      POSITIVE: {
        code: 'T0001-1',
        message: 'El valor debe ser positivo',
      },
      NEGATIVE: {
        code: 'T0001-2',
        message: 'El valor debe ser negativo',
      },
      MIN: {
        code: 'T0001-3',
        message: 'El valor es menor a',
      },
      MAX: {
        code: 'T0001-4',
        message: 'El valor es mayor a',
      },
    },
  },
  BOOLEAN: {
    code: 'T0002',
    message: 'El valor debe ser de tipo: boolean',
  },
  ARRAY: {
    code: 'T0002',
    message: 'El valor debe ser de tipo: array',
  },
};
