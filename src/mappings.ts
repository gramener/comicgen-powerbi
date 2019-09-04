interface IComic {
    emotion_normal: string;
    emotion_laugh: string;
    emotion_sad: string;
    emotion_angry: string;
    emotion_worried: string;
    emotion_surprised: string;
    emotion_wink: string;
 }

let comicMappings: { [id: string]: IComic; } = {
    "dey": {
        emotion_normal: "normal",
        emotion_laugh: "smile",
        emotion_sad: "tired",
        emotion_angry: "shocked",
        emotion_worried: "shocked",
        emotion_surprised: "hmmconfused",
        emotion_wink: "wink"
    },
    "dee": {
        emotion_normal: "smile",
        emotion_laugh: "smilehappy",
        emotion_sad: "sad",
        emotion_angry: "angryfrustrated",
        emotion_worried: "worried",
        emotion_surprised: "angryshouting",
        emotion_wink: "wink"
    },
 };
export default comicMappings;
