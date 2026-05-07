from locust import HttpUser, between, task


class WebUser(HttpUser):
    # Base URL of backend API. You can override with --host.
    host = "http://localhost:3005"
    wait_time = between(1, 3)

    def on_start(self):
        payload = {
            "emailOrUsername": "test@mail.com",
            "password": "123456",
        }
        response = self.client.post("/api/auth/login", json=payload, name="POST /api/auth/login")

        if response.status_code != 200:
            response.failure(f"Login failed: {response.status_code} {response.text}")
            self.token = None
            return

        data = response.json()
        self.token = data.get("access_token")

    def _auth_headers(self):
        if not self.token:
            return {}
        return {"Authorization": f"Bearer {self.token}"}

    @task(3)
    def get_profile(self):
        self.client.get(
            "/api/users/me",
            headers=self._auth_headers(),
            name="GET /api/users/me",
        )

    @task(2)
    def list_categories(self):
        self.client.get(
            "/api/categories",
            headers=self._auth_headers(),
            name="GET /api/categories",
        )

    @task(1)
    def list_transactions(self):
        self.client.get(
            "/api/transactions?sortBy=date&sortOrder=desc",
            headers=self._auth_headers(),
            name="GET /api/transactions",
        )
