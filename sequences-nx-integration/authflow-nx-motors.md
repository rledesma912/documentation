
sequenceDiagram
    NX client app->>Motors Auth svc: Request NX access token by Id client and secret
    activate Motors Auth svc
    Motors Auth svc->>Motors Auth svc: Verify client credentials
    Motors Auth svc-->>NX client app: Response access token
    deactivate Motors Auth svc

    loop Access token is valid
        NX client app->>+API Motors: API request with access token
        API Motors-->>-NX client app: API response
    end
