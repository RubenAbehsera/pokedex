export const ucfirst = (s: string | undefined) => {
    if((typeof s) === "string"){
        return s!.charAt(0).toUpperCase() + s!.slice(1)
    }
}