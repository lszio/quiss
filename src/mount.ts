import extendRoom from './extend.room'

export default function(): void {
    if (!global.hasExtension) {
        console.log('[mount] 重新挂载拓展')
        global.hasExtension = true

        extendRoom()
    }
}