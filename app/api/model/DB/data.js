export const dbData = {
  "users": [
    {
      "username": "user123",
      "family_id": 1
    },
    {
      "username": "user234",
      "family_id": 1
    },
  ],
  "families": [
    {
      "id": 1,
      "name": "Family Test",
      "activeSecretSanta": false,
      "members": [
        {"id": 1, "name": "User", "lastname": "Tester", "family_id": 1, "prevSecretSantas": [7, 4], "immediateFamily": [], "currentSecretSanta": null, "username": "user123"},
        {"id": 2, "name": "Second", "lastname": "Tester", "family_id": 1, "prevSecretSantas": [9, 8], "immediateFamily": [], "currentSecretSanta": null, "username": "user234"},
        {"id": 3, "name": "Sofía", "lastname": "Hernández Ruiz", "family_id": 1, "prevSecretSantas": [6, 9], "immediateFamily": [4, 5], "currentSecretSanta": null, "username": null},
        {"id": 4, "name": "Jorge", "lastname": "Hernández López", "family_id": 1, "prevSecretSantas": [1, 7], "immediateFamily": [3, 5], "currentSecretSanta": null, "username": null},
        {"id": 5, "name": "Ana", "lastname": "Ruiz Castro", "family_id": 1, "prevSecretSantas": [2, 6], "immediateFamily": [3, 4], "currentSecretSanta": null, "username": null},
        {"id": 6, "name": "José Luis", "lastname": "López Vega", "family_id": 1, "prevSecretSantas": [3, 5], "immediateFamily": [7, 8], "currentSecretSanta": null, "username": null},
        {"id": 7, "name": "Carlos", "lastname": "López Segura", "family_id": 1, "prevSecretSantas": [4, 10], "immediateFamily": [6 ,8], "currentSecretSanta": null, "username": null},
        {"id": 8, "name": "Mónica", "lastname": "Vega Ramírez", "family_id": 1, "prevSecretSantas": [10, 1], "immediateFamily": [6, 7], "currentSecretSanta": null, "username": null},
        {"id": 9, "name": "Luis", "lastname": "Martínez Durán", "family_id": 1, "prevSecretSantas": [8, 2], "immediateFamily": [10], "currentSecretSanta": null, "username": null},
        {"id": 10, "name": "Carla", "lastname": "Sánchez Molina", "family_id": 1, "prevSecretSantas": [5, 3], "immediateFamily": [9], "currentSecretSanta": null, "username": null}
      ]
    },
  ],
}
