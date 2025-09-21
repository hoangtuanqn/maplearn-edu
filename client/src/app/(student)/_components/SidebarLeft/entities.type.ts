export interface SidebarType {
    title: string;
    url: string;
    image: string;
    className?: string;
    id?: string;
}
export interface NewType extends SidebarType {
    createdAt: string;
}
export interface TagType {
    id: number;
    name: string;
    created_at: string;
}
