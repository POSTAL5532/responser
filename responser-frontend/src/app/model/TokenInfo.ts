export class TokenInfo {

    accessToken: string;

    tokenType: string;

    refreshToken: string;

    expiresIn: number;

    public static deserialize(data: any): TokenInfo {
        return Object.assign(new TokenInfo(), {
            accessToken: data.access_token,
            tokenType: data.token_type,
            refreshToken: data.refresh_token,
            expiresIn: Number.parseInt(data.expires_in)
        });
    }
}
