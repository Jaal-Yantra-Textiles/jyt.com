export async function fetchDesigns() {
    const response = await fetch('https://api.cynsar.capital/items/designs?fields[]=*, designer.*,design_sketches.*.filename_disk');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

 export  async function fetchIndividualDesignData(id: any){
    const response = await fetch(`https://api.cynsar.capital/items/designs/${id}?fields=inspired_from.images_for_inspiration.*.title&fields=inspired_from.images_for_inspiration.*.tags&fields=inspired_from.images_for_inspiration.*.tags&fields=inspired_from.images_for_inspiration.*.filename_disk`)
    if (!response.ok){
        throw new Error('Network response was not ok');
    }
    return response.json
}