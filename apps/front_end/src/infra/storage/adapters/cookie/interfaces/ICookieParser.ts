export interface ICookieParser {

    /**
     * Parses browser cookies into a map.
     */
    parse(): Map<string, string>;

}