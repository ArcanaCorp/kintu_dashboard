export const fetchStatus = async () => {
    try {
        const res = await fetch("https://bot.kintutravelexpeditions.com/whatsapp/status")
        if (!res.ok) throw new Error("status error")
        const data = await res.json()
        console.log(data);
        return data.status
    } catch (error) {
        return error;
    }
}

export const fetchQr = async () => {
    try {
        const res = await fetch("https://bot.kintutravelexpeditions.com/whatsapp/qr")
        if (!res.ok) return null
        const data = await res.json()
        console.log(data);
        return data.qr
    } catch (error) {
        return error
    }
}