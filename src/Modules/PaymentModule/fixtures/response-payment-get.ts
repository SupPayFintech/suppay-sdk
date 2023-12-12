export const PaymentGetResponseMock = {
  success: true,
  message: 'Sucesso',
  data: {
    id: 'f795627a-3c96-48f3-91c8-8560e46f460d',
    identifier: 'CUSTOMIDENTIFIER',
    installments: [
      {
        value: 1000,
        due_date: '2024-01-17',
        identifier: 'a3d499d4-abf2-4700-9ac7-957ab5a89a21',
      },
    ],
    expected_settlements: [],
    total: 1000,
    subtotal: 1000,
    fee: 0,
    fee_split: 0,
    prevention_increase: 0,
    proven_amount: 0,
    status: 'awaiting-authorization',
    status_label: 'Aguardando autorização',
    type: 'single',
    type_label: 'Avulso',
    commercial_establishment: {
      name: 'Feest-Oberbrunner',
      document: '21736907000193',
    },
    supplier: {
      name: 'Nikolaus, Johnson and Ratke',
      document: '06870124000104',
    },
    proofs: [],
    can_operate: true,
    created_at: '2023-12-12T12:14:05.000000Z',
    status_history: [
      {
        status: 'awaiting-authorization',
        createdAt: '2023-12-12T12:14:05.560468Z',
      },
    ],
  },
};
