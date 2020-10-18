import admin from "firebase-admin";

try {
    admin.initializeApp({
        credential: admin.credential.cert({
            "type": "service_account",
            "project_id": "bpac11",
            "private_key_id": "327793f801c3f37512efc12189b9868867c523c4",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCSIgLrwCbJs6hO\n7rrJmYb2GREoamHCT7ARTgx5+ZsttMgPZunsjN9LUaOC7MiKPN5OqQ8fTjEqYxGc\nFJkkjjHVRMnxCMQAsQSoGrQjPwqewA2rVi/s/fwIuB8r175UKnY/peWwK6W/ITim\ntI1UprsJdJYtGkxIqWsmdBvBIakdyVdmKsv9VDXY3cDVFz8eBDW4eMUFBnvrpo5+\nUYwLnSmduVv2qmUFTgS8FWgyGzGDl6f3j+gHVbuvjFhuR1CoTdP7p9tY35UVhV2M\nFWe3PlBacePOxInC/3Qa9Z5Qys/5/y/2yBWyR7Dk8xu367C+5jnuUfIi7BYUxoi0\nqnWGNm9xAgMBAAECggEACSLyPs4lPrAqYkD/0bH1I7begUHhedYkonhYRFoMTzfB\n2GCtWHpYTau9huaKBUaX+aANT35Cia1nAPSyvHvddsGVxKmxI3/t1BrTT27WGaXV\nVPSPC4i3tM3aORIEltuOyBz1tuWLt976XUXlnjjMceNlrk06HsLk7aMNxy31FmUT\nig2MRNVGYnUEbvW3LRk6oB4h+UxU4sSihHkUTMsuaGFMy3y7R9HplUhoA6EIcJph\nZI6YXlR+WQHroysq7NUVlOLj6TNZBQxOPObdkdgouelKRGUwKJVAKlrpy7brTxyb\nalyPwHf1lnenq2aMsUJA8S/eSytRp0DCVwUsrMwLVwKBgQDJ3yW4zHeMac3ogHvy\nfNgYDPvdwlGczoBy7mWWmm2GFJ8QEHTbr/cW0S/l9nkYetS1Msltxsqm/kOYNm04\nGmSYuifXfY+qi0oIXPCSws2axZDUskhaguHY4OcnSyxM0a8+4IfQL4NlUvSNbD+V\n3/3c98XAf65PlOt3g+I86v1vXwKBgQC5UNjCMlvSB4sehmQ/nV39aPcCWUXek5qs\nEKZXmgQcZMpgl6x55fZIh0cEVt7KPfjVyH5SNX5TC2wCmDQum9fGRPAklsozjQ3c\n3xquXLNGNjGssr7QJLGhX8mrDrI47sathRY/otXpBGfyOWpPjQjmspWZEPGweMUh\nwsJOCasjLwKBgAlyevZyAyo8DVnTIXnQo+BEQ0k2fdFDzLkUNQbeRT/gGS2MR5u8\nWWjk80Pky/f8T5YHQWv0wKkd/xXRfj0A5zJKi/DGvIFzsUxA5TVJDowusL9zdHVf\n6KfYppitKO6TZYsgwNpaTuDgB/fSWAtwhxXfNo7yqrqosnhOYLkPGjsrAoGARyTK\nkoNSzOcoeaeOhP2dP9Q0QCqVsEVqc/RQaAEw4tWu/DY+eO3YBzAoC3puPaZdCXXX\nSShQPwF7jeNw5RPfWrbMmr9pETFtyQW98IKWMLZNi8dzieUMbK+hdJJHyaOhkqwt\nRnD1Pmf6n/t63N+AM1EMLZ9bqiwzQirK/bqogPECgYBGm3mlD52sBbMeeUA/TOCV\ntPfTWR0dfEOaqQVCypvXoyKno73yiLcb3j6a8BldHyvwG87OVif8rTOnki28pR3M\nW9HXYDFcR5pN+5Jq6WhdbwTQjV2AWUieDPPVvaAIYFZkkEfydywnYS6N3R2uvYO2\nqJWYK4cLJPyQefKkkqAbmQ==\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-wt5jv@bpac11.iam.gserviceaccount.com",
            "client_id": "105958718929406974409",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wt5jv%40bpac11.iam.gserviceaccount.com"
        } as admin.ServiceAccount),
        databaseURL: "https://bpac11.firebaseio.com"
    })
} catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
      // eslint-disable-next-line no-console
      console.error('Firebase admin initialization error', error.stack);
    }
  }
  
  export default admin.firestore()