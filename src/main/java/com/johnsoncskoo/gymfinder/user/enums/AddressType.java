package com.johnsoncskoo.gymfinder.user.enums;

import com.johnsoncskoo.gymfinder.util.DisplayUtil;
import com.johnsoncskoo.gymfinder.util.Displayable;

public enum AddressType implements Displayable {
    HOME,
    WORK,
    OTHER;

    @Override
    public String getDisplayName() {
        return DisplayUtil.getDisplayName(this);
    }
}
