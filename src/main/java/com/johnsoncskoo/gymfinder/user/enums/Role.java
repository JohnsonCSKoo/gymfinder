package com.johnsoncskoo.gymfinder.user.enums;

import com.johnsoncskoo.gymfinder.util.DisplayUtil;
import com.johnsoncskoo.gymfinder.util.Displayable;

public enum Role implements Displayable {
    ADMIN,
    USER,
    GYM_OWNER;

    @Override
    public String getDisplayName() {
        return DisplayUtil.getDisplayName(this);
    }
}
