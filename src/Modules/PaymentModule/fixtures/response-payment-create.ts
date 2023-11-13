export const paymentCreateData = {
  success: true,
  message: "Sucesso",
  data: {
    id: "c8c50694-be93-4bc8-a61d-993976c3e7aa",
    identifier: "exampleidentify",
    installments: [
      {
        value: 100000,
        due_date: "2023-11-30",
        identifier: "1be6f66b-421b-407f-83bb-fcfa49885d98",
      },
    ],
    expected_settlements: [],
    total: 101280,
    subtotal: 100000,
    fee: 1280,
    fee_split: 0,
    prevention_increase: 0,
    proven_amount: 0,
    status: "processing",
    status_label: "Processando",
    type: "single",
    type_label: "Avulso",
    commercial_establishment: {
      name: "Estabelecimento Comercial",
      document: "73457691000120",
    },
    supplier: {
      name: "Fornecedor",
      document: "22781319000134",
    },
    proofs: [],
    can_operate: true,
    created_at: "2023-11-12T19:19:39.000000Z",
    status_history: [
      {
        status: "awaiting-authorization",
        createdAt: "2023-11-12T19:19:39.771806Z",
      },
      {
        status: "processing",
        createdAt: "2023-11-12T19:19:39.789470Z",
      },
    ],
  },
};
