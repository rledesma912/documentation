
sequenceDiagram
    ClientApp->>OAuth 2.0: Request access token by Id client and secret
    activate OAuth 2.0
    OAuth 2.0->>OAuth 2.0: Verify client credentials
    OAuth 2.0-->>ClientApp: Response access token
    deactivate OAuth 2.0

    activate Apim
        ClientApp->>Apim: Request with access token
        Apim ->> OAuth 2.0: Validate (JWT)
        activate OAuth 2.0
            OAuth 2.0->>OAuth 2.0: Verify access token
            OAuth 2.0 -->> Apim: Valid !
        deactivate OAuth 2.0

        Apim->>+API: API request with access token
        API-->>-ClientApp: API response

    deactivate Apim
