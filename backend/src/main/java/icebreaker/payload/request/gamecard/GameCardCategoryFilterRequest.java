package icebreaker.payload.request.gamecard;

import java.util.HashSet;
import java.util.Set;

import icebreaker.models.ECategory;

public class GameCardCategoryFilterRequest {
    
    private Set<ECategory> categories = new HashSet<>();

    public Set<ECategory> getCategories() {
        return categories;
    }

    public void setCategories(Set<ECategory> categories) {
        this.categories = categories;
    }
}