import { useMutation, useSelf } from "../../liveblocks.config"

export const useDeleteLayers = () => {
    const selection = useSelf((me) => me.presence.selection);
    
    return useMutation(({ storage, setMyPresence }) => {
        const liveLayers = storage.get("layers");
        const liveLayerIds = storage.get("layerIds");
        
        if (!selection || selection.length === 0) {
            return;
        }
        
        for (const layerId of selection) {
            // Delete from layers map
            liveLayers.delete(layerId);
            
            // Find and delete from layerIds array
            const index = liveLayerIds.indexOf(layerId);
            if (index !== -1) {
                liveLayerIds.delete(index);
            }
        }
        
        // Clear selection
        setMyPresence({
            selection: [],
        }, { addToHistory: true });
    }, [selection]);
}