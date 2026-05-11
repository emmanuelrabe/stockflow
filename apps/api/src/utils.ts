export function generateRandomSKU() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let randomLetters = ''
    for (let i = 0; i < 3; i++) {
        randomLetters += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    const randomNumber = Math.floor(Math.random() * 9999) + 1

    const formattedNumber = String(randomNumber).padStart(4, '0')

    return `${randomLetters}-${formattedNumber}`
}
