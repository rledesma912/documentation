
sequenceDiagram
    ClientApp->>Motors Auth svc: Request access token by Id client and secret
    activate Motors Auth svc
    Motors Auth svc->>Motors Auth svc: Verify client credentials
    Motors Auth svc-->>ClientApp: Response access token
    deactivate Motors Auth svc

    loop Access token is valid
        ClientApp->>+API: API request with access token
        API-->>-ClientApp: API response
    end
