export const paymentAllData = {
  success: true,
  message: "Sucesso",
  data: [
    {
      id: "aaa0e0db-9e09-4547-93f1-43207eaba63c",
      identifier: "00011511",
      installments: [
        {
          value: 142650,
          due_date: "2023-11-27",
          identifier: "dc3bb3cb-2373-4bbe-9e8d-50b7567cefe8",
        },
      ],
      expected_settlements: [
        {
          date: "2023-11-27",
          acquirer: "16501555000157",
          arrangement_code: "ACC",
          amount: 1397,
          type: "fee",
          paid: false,
        },
        {
          date: "2023-11-27",
          acquirer: "16501555000157",
          arrangement_code: "ACC",
          amount: 16451,
          type: "subtotal",
          paid: false,
        },
        {
          date: "2023-11-27",
          acquirer: "16501555000157",
          arrangement_code: "ECC",
          amount: 93304,
          type: "subtotal",
          paid: false,
        },
        {
          date: "2023-11-27",
          acquirer: "16501555000157",
          arrangement_code: "MCC",
          amount: 32895,
          type: "subtotal",
          paid: false,
        },
      ],
      total: 144047,
      subtotal: 142650,
      fee: 1397,
      fee_split: 0,
      prevention_increase: 0,
      proven_amount: 0,
      status: "awaiting-proof",
      status_label: "Aguardando comprovante",
      type: "order",
      type_label: "Pedido",
      commercial_establishment: {
        name: "MAPA DE MINAS RESTAURANTE LTDA",
        document: "02200880000175",
      },
      supplier: {
        name: "NOVA CINTRA DISTRIBUIDORA LTDA",
        document: "10611758000110",
      },
      proofs: [],
      can_operate: true,
      created_at: "2023-11-10T19:41:52.000000Z",
      status_history: [
        {
          status: "awaiting-authorization",
          createdAt: "2023-11-10T19:41:52.125854Z",
        },
        {
          status: "processing",
          createdAt: "2023-11-10T19:41:52.211305Z",
        },
        {
          status: "processing",
          createdAt: "2023-11-10T19:41:54.048058Z",
        },
        {
          status: "processing",
          createdAt: "2023-11-10T19:42:05.148720Z",
        },
        {
          status: "processing",
          createdAt: "2023-11-10T19:42:05.601171Z",
        },
        {
          status: "processing",
          createdAt: "2023-11-10T19:42:13.678703Z",
        },
        {
          status: "processing",
          createdAt: "2023-11-10T19:42:14.093415Z",
        },
        {
          status: "processing",
          createdAt: "2023-11-10T19:42:23.919160Z",
        },
        {
          status: "processing",
          createdAt: "2023-11-10T19:42:24.358007Z",
        },
        {
          status: "processing",
          createdAt: "2023-11-10T19:42:32.445391Z",
        },
      ],
    },
  ],
  complements: {
    current_page: 1,
    last_page: 5,
    per_page: 10,
    total: 43,
  },
};
