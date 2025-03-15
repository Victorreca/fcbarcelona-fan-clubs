import FanClub from "./fanClub";
import EventClub from "./eventClub";

FanClub.hasOne(EventClub, {
  foreignKey: "fanclub_id",
  as: "event",
});

EventClub.belongsTo(FanClub, {
  foreignKey: "fanclub_id",
  as: "fanclub",
});

export { FanClub, EventClub };
