
sequenceDiagram
    NX client app->>OAuth 2.0: Request NX access token by Id client and secret
    activate OAuth 2.0
    OAuth 2.0->>OAuth 2.0: Verify client credentials
    OAuth 2.0-->>NX client app: Response access token
    deactivate OAuth 2.0

    activate APIM GS
        NX client app->>APIM GS: Request NX with access token
        APIM GS ->> OAuth 2.0: Validate (JWT)
        activate OAuth 2.0
            OAuth 2.0->>OAuth 2.0: Verify access token
            OAuth 2.0 -->> APIM GS: Valid !
        deactivate OAuth 2.0

        APIM GS->>+API Motors: API request with access token
        API Motors-->>-NX client app: API response

    deactivate APIM GS
