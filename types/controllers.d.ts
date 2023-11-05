export interface IReqBody {
    urlTitle?: string,
    redirectedUrl: string
}

export interface IResBody extends IReqBody {
    shortUrl: string,
    createdAt: Date
}