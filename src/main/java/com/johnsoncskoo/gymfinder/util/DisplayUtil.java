package com.johnsoncskoo.gymfinder.util;

public class DisplayUtil {
    public static String getDisplayName(Enum<?> e) {
        return e.name().replace("_", " ").toLowerCase().replaceFirst(".",
                Character.toString(e.name().charAt(0)).toUpperCase());
    }
}
