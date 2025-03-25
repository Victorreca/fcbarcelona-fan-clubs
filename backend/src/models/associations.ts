import FanClub from "./fanClub";
import EventClub from "./eventClub";

FanClub.hasMany(EventClub, {
  foreignKey: "fanclub_id",
  as: "events",
});

EventClub.belongsTo(FanClub, {
  foreignKey: "fanclub_id",
  as: "fanclub",
});

export { FanClub, EventClub };
