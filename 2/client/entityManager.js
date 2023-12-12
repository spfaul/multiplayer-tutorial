class EntityManager {
    constructor() {
        this.entities = new Map();
    }

    exists(id) {
        return this.entities.has(id);
    }

    registerNewPlayer(data) {
        const playerSprite = new Sprite(data.position.x, data.position.y);
        playerSprite.diameter = 50;
        this.entities.set(data.id, {
            sprite: playerSprite
        })
    }
    
    updatePlayerData(newData) {
        let currData = this.entities.get(newData.id);
        if (!currData) return;
        currData.sprite.pos.x = newData.position.x;
        currData.sprite.pos.y = newData.position.y;
    }
}