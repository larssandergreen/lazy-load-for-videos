type VideoPreviewProps = {
    url: string;
}

export default function VideoPreview({ url }: VideoPreviewProps) {
    return <div>{url}</div>;
}
