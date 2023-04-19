export interface NavItemsType {
    id: string;
    title: string;
    href: string;
}

export interface ButtonType {
    text: string;
    clickFunction: () => void
}

export interface DelegateTableType {
    data: {
        name: string,
        votes: string,
        quorum_percent: string,
        delegate_votes_percent: string,
        image: string,
    }[]
}