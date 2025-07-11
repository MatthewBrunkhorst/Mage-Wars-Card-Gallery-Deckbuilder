//Data Set is not super large nor is it likely to ever update, so I have it hardcoded.

/*List of cards that exist
Relevant information:
    Broad (all cards): Name, Text, Type, Subtype(s), Casting Cost, Speed (Quick/Full action), Range, Target, Level(s) (i.e. "1 fire and 1 nature" or "1 fire or 1 nature"),
        Keywords (i.e. melee +x), Attack Info, Defense Info
    Info for each attack: Name, Speed, Ranged/Melee/Zone, Range, Damage Type, Number of Die, Effect Roll, Keywords (Ethereal, +2 vs Flying)
    Info for each defense: Roll needed, number of uses, works vs melee, works vs ranged, other specifications
    Enchantments: Reveal Cost
    Equipment: Equipment Slot
    Creature: Armor, Life

Format: (USE "NONE" WHEN NO VALUE APPLIES FOR STRINGS and -1 FOR INTEGERS (i.e. subtype 4 on all cards, equipment slot when not equipment, etc.) BUT ALWAYS PUT EVERY ARRAY THAT EXISTS (i.e. a card with no subtype should still have a subtype array with 4 NONEs in it rather than a NONE in place of an array))
[Name, Type, [Subtype 1, Subtype 2, Subtype 3, Subtype 4], Casting Cost, Reveal Cost (Use -1 for non-enchantments), Speed, Min Range, Max Range, Target, 
[Total Level, Level Part 1, Level Part 2, Level Part 3, Level Part 4], [Keyword 1, Keyword 2, ..., Keyword 12], [Attack Info 1, Attack Info 2, Attack Info 3, Attack Info 4],
[Defense Info 1, Defense Info 2], Equipment Slot, Armor, Life]

Format for Subarrays:
Level Part: [Number of levels in part, type 1, type 2, type 3, type 4, type 5] - AND types have multiple level parts, OR types are in one part
ex. The level array for a card that is level 3 fire, level 1 earth, and level 1 in either arcane or nature would look like [5, [3, FIRE, NONE, NONE, NONE, NONE], [1, EARTH, NONE, NONE, NONE, NONE], [1, ARCANE, NATURE, NONE, NONE, NONE], [0, NONE, NONE, NONE, NONE, NONE]]

Attack Info: [Name, Speed, Ranged/Melee/Zone, Min Range, Max Range, Damage Type, Number of Die, Effect Roll, Text]
Effect Roll: [[Effect Roll Minimum for Effect 1 (USE -1 for NONE), Effect 1], ..., [Effect Roll Minimum for Effect 4, Effect 4]]

Defense Info: [Roll Needed, Num Uses, Works VS Melee/Ranged/All, Text]

example card: asto vidatu, angel slayer:
["Asto Vidatu, Angel Slayer", "Creature", ["Manticore", "NONE", "NONE", "NONE"], 20, -1, "FULL", 0, 0, "Zone", [5, [3, "Arcane", "NONE", "NONE", "NONE", "NONE"], [2, "Dark", "NONE", "NONE", "NONE", "NONE"], [0, "NONE", "NONE", "NONE", "NONE", "NONE"], [0, "NONE", "NONE", "NONE", "NONE", "NONE"]], ["Cripple", "Piercing +X", "Weak", "Flying", "Legendary", "Tough -X", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE"], ["Claws", "Quick", "Melee", 0, 0, "Physical", 5, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"], ["Toxic Spines", "Full", "Ranged", 0, 1, "Physical", 2, [8, "Cripple"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "Piercing +1"], ["Poison Stinger", "Full", "Melee", 0, 0, "Physical", 2, [5, "Weak"], [9, "2 Weak"], [-1, "NONE"], [-1, "NONE"], "Piercing +1"], ["NONE", "NONE", "NONE", -1, -1, "NONE", -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"], [[-1, -1, "NONE", "NONE"], [-1, -1, "NONE", "NONE"]], "NONE", 2, 14]


Blank template:
["NAME", TYPE, ["NONE", "NONE", "NONE", "NONE"], COST, -1, ACTION, 0, 0, "TARGET", [-1, [0, SCHOOL, SCHOOL, SCHOOL, SCHOOL, SCHOOL], [0, SCHOOL, SCHOOL, SCHOOL, SCHOOL, SCHOOL], [0, SCHOOL, SCHOOL, SCHOOL, SCHOOL, SCHOOL], [0, SCHOOL, SCHOOL, SCHOOL, SCHOOL, SCHOOL]], [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD], ["NONE", ACTION, MELEERANGEDZONETRAMPLEANY, -1, -1, DamageType, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"], ["NONE", ACTION, MELEERANGEDZONETRAMPLEANY, -1, -1, DamageType, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"], ["NONE", ACTION, MELEERANGEDZONETRAMPLEANY, -1, -1, DamageType, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"], ["NONE", ACTION, MELEERANGEDZONETRAMPLEANY, -1, -1, DamageType, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"], [[-1, -1, MELEERANGEDZONETRAMPLEANY, "NONE"], [-1, -1, MELEERANGEDZONETRAMPLEANY, "NONE"]], SLOT, -1, -1]
*/
const NONE = -1
const COST = -1

const TYPE = -1
const AttackSpell = 1
const Creature = 2
const Conjuration = 3
const Enchantment = 4
const Equipment = 5
const Incantation = 6

const ACTION = -1
const Quick = 1
const Full = 2
const NoAction = 3

const SCHOOL = -1
const Air = 1
const Arcane = 2
const Dark = 3
const Earth = 4
const Fire = 5
const Holy = 6
const Mind = 7
const Nature = 8
const War = 9
const Water = 10

const SLOT = -1
const Amulet = 1
const Belt = 2
const Boots = 3
const ChestPiece = 4
const Cloak = 5
const Gloves = 6
const Helmet = 7
const Ring = 8
const Shield = 9
const Weapon = 10
const WeaponOrShield = 11
const WeaponAndShield = 12
const NoSlot = 13

const DamageType = -1
const Typeless = 1
const Acid = 2
const Flame = 3
const Hydro = 4
const Light = 5
const Lightning = 6
const Poison = 7
const Psychic = 8
const Wind = 9
const NoDamage = 10

const MELEERANGEDZONETRAMPLEANY = -1 //Use for both attacks and defenses (category for attack, valid attacks to defend against for defenses)
const Melee = 1
const Ranged = 2
const Zone = 3
const Trample = 4
const Passage = 5
const DamageBarrier = 6
const NonAttackMelee = 7
const NonAttackRanged = 8
const NonAttackZone = 9
const Any = 10

const TRAINEDOPPOSED = -1
const Trained = 1
const Opposed = 2

//This section largely generated by Python code fed list of keywords, tuned to make keywords look better - I added all the spaces in the strings individually
Keywords = []
Keywords.length = 200
const KEYWORD = -1
const AdditionalAttackDice = 1
Keywords[AdditionalAttackDice] = "Additional Attack Dice"
const AegisX = 2
const Aegis = 2
Keywords[AegisX] = "Aegis X"
const AirMageOnly = 3
Keywords[AirMageOnly] = "Air Mage Only"
const ArcaneMageOnly = 4
Keywords[ArcaneMageOnly] = "Arcane Mage Only"
const DarkMageOnly = 5
Keywords[DarkMageOnly] = "Dark Mage Only"
const EarthMageOnly = 6
Keywords[EarthMageOnly] = "Earth Mage Only"
const FireMageOnly = 7
Keywords[FireMageOnly] = "Fire Mage Only"
const HolyMageOnly = 8
Keywords[HolyMageOnly] = "Holy Mage Only"
const MindMageOnly = 9
Keywords[MindMageOnly] = "Mind Mage Only"
const NatureMageOnly = 10
Keywords[NatureMageOnly] = "Nature Mage Only"
const WarMageOnly = 11
Keywords[WarMageOnly] = "War Mage Only"
const WaterMageOnly = 12
Keywords[WaterMageOnly] = "Water Mage Only"
const ArmorPlusX = 13
Keywords[ArmorPlusX] = "Armor +X"
const ArmorMinusX = 14
Keywords[ArmorMinusX] = "Armor -X"
const Autonomous = 15
Keywords[Autonomous] = "Autonomous"
const BattleOrders = 16
Keywords[BattleOrders] = "Battle Orders"
const BeastmasterOnly = 17
Keywords[BeastmasterOnly] = "Beastmaster Only"
const DruidOnly = 18
Keywords[DruidOnly] = "Druid Only"
const ForcemasterOnly = 19
Keywords[ForcemasterOnly] = "Forcemaster Only"
const NecromancerOnly = 20
Keywords[NecromancerOnly] = "Necromancer Only"
const PaladinOnly = 21
Keywords[PaladinOnly] = "Paladin Only"
const PriestessOnly = 22
Keywords[PriestessOnly] = "Priestess Only"
const SirenOnly = 23
Keywords[SirenOnly] = "Siren Only"
const WarlockOnly = 24
Keywords[WarlockOnly] = "Warlock Only"
const WarlordOnly = 25
Keywords[WarlordOnly] = "Warlord Only"
const WizardOnly = 26
Keywords[WizardOnly] = "Wizard Only"
const Bleed = 27
Keywords[Bleed] = "Bleed"
const BlocksLOS = 28
Keywords[BlocksLOS] = "Blocks LOS"
const BloodthirstyPlusX = 29
const Bloodthirsty = 29
Keywords[BloodthirstyPlusX] = "Bloodthirsty +X"
const Burn = 30
Keywords[Burn] = "Burn"
const Burnproof = 31
Keywords[Burnproof] = "Burnproof"
const Cancel = 32
Keywords[Cancel] = "Cancel"
const Cantrip = 33
Keywords[Cantrip] = "Cantrip"
const Challenge = 34
Keywords[Challenge] = "Challenge"
const Channeling = 35
Keywords[Channeling] = "Channeling"
const ChannelingPlusX = 36
Keywords[ChannelingPlusX] = "Channeling +X"
const ChannelingMinusX = 37
Keywords[ChannelingMinusX] = "Channeling -X"
const CnargePlusX = 38
const Charge = 38
Keywords[CnargePlusX] = "Cnarge +X"
const Climbing = 39
Keywords[Climbing] = "Climbing"
const Condition = 40
Keywords[Condition] = "Condition"
const Corporeal = 41
Keywords[Corporeal] = "Corporeal"
const Corrode = 42
Keywords[Corrode] = "Corrode"
const Counter = 43
Keywords[Counter] = "Counter"
const Counterstrike = 44
Keywords[Counterstrike] = "Counterstrike"
const Cripple = 45
Keywords[Cripple] = "Cripple"
const CriticalDamage = 46
Keywords[CriticalDamage] = "Critical Damage"
const DamageBarrierAttack = 47
Keywords[DamageBarrierAttack] = "Damage Barrier"
const Daze = 48
Keywords[Daze] = "Daze"
const Defense = 49
Keywords[Defense] = "Defense"
const Defrost = 50
Keywords[Defrost] = "Defrost"
const Destroy = 51
Keywords[Destroy] = "Destroy"
const Devour = 52
Keywords[Devour] = "Devour"
const DirectDamage = 53
Keywords[DirectDamage] = "Direct Damage"
const Disable = 54
Keywords[Disable] = "Disable"
const DiscardPile = 55
Keywords[DiscardPile] = "Discard Pile"
const DissipateX = 56
const Dissipate = 56
Keywords[DissipateX] = "Dissipate X"
const Doublestrike = 57
Keywords[Doublestrike] = "Doublestrike"
const Elusive = 58
Keywords[Elusive] = "Elusive"
const Epic = 59
Keywords[Epic] = "Epic"
const EscapeRoll = 60
Keywords[EscapeRoll] = "Escape Roll"
const Ethereal = 61
Keywords[Ethereal] = "Ethereal"
const Extendable = 62
Keywords[Extendable] = "Extendable"
const Extinguish = 63
Keywords[Extinguish] = "Extinguish"
const Familiar = 64
Keywords[Familiar] = "Familiar"
const Fast = 65
Keywords[Fast] = "Fast"
const FewerAttackDice = 66
Keywords[FewerAttackDice] = "Fewer Attack Dice"
const FiniteLife = 67
Keywords[FiniteLife] = "Finite Life"
const FlameDamage = 68
Keywords[FlameDamage] = "Flame Damage"
const FlamePlusX = 69
Keywords[FlamePlusX] = "Flame +X"
const FlameMinusX = 70
Keywords[FlameMinusX] = "Flame -X"
const FlameImmune = 71
Keywords[FlameImmune] = "Flame Immunity"
const Flying = 72
Keywords[Flying] = "Flying"
const FrostDamage = 73
Keywords[FrostDamage] = "Frost Damage"
const FrostPlusX = 74
Keywords[FrostPlusX] = "Frost +X"
const FrostMinusX = 75
Keywords[FrostMinusX] = "Frost -X"
const FrostImmune = 76
Keywords[FrostImmune] = "Frost Immunity"
const Grapple = 77
Keywords[Grapple] = "Grapple"
const Growth = 78
Keywords[Growth] = "Growth"
const Guard = 79
Keywords[Guard] = "Guard"
const Heal = 80
Keywords[Heal] = "Heal"
const Hinder = 81
Keywords[Hinder] = "Hinder"
const HydroDamage = 82
Keywords[HydroDamage] = "Hydro Damage"
const HydroPlusX = 83
Keywords[HydroPlusX] = "Hydro +X"
const HydroMinusX = 84
Keywords[HydroMinusX] = "Hydro -X"
const HydroImmune = 85
Keywords[HydroImmune] = "Hydro Immunity"
const IchthellidLarva = 86
Keywords[IchthellidLarva] = "Ichthellid Larva"
const Ignore = 87
Keywords[Ignore] = "Ignore"
const Incapacitated = 88
Keywords[Incapacitated] = "Incapacitated"
const Incorporeal = 89
Keywords[Incorporeal] = "Incorporeal"
const Indestructible = 90
Keywords[Indestructible] = "Indestructible"
const Indirect = 91
Keywords[Indirect] = "Indirect"
const InnateLifePlusX = 92
const InnateLife = 92
Keywords[InnateLifePlusX] = "Innate Life +X"
const Intercept = 93
Keywords[Intercept] = "Intercept"
const Invisible = 94
Keywords[Invisible] = "Invisible"
const Legendary = 95
Keywords[Legendary] = "Legendary"
const Level = 96
Keywords[Level] = "Level"
const Life = 97
Keywords[Life] = "Life"
const LifePlusX = 98
Keywords[LifePlusX] = "Life +X"
const LifeMinusX = 99
Keywords[LifeMinusX] = "Life -X"
const LifebondPlusX = 100
const Lifebond = 100
Keywords[LifebondPlusX] = "Lifebond +X"
const LightDamage = 101
Keywords[LightDamage] = "Light Damage"
const LightPlusX = 102
Keywords[LightPlusX] = "Light +X"
const LightMinusX = 104
Keywords[LightMinusX] = "Light -X"
const LightImmune = 105
Keywords[LightImmune] = "Light Immunity"
const LightningDamage = 106
Keywords[LightningDamage] = "Lightning Damage"
const LightningPlusX = 107
Keywords[LightningPlusX] = "Lightning +X"
const LightningMinusX = 108
Keywords[LightningMinusX] = "Lightning -X"
const LightningImmune = 109
Keywords[LightningImmune] = "Lightning Immunity"
const Living = 110
Keywords[Living] = "Living"
const Lumbering = 111
Keywords[Lumbering] = "Lumbering"
const Mage = 112
Keywords[Mage] = "Mage"
const MagebindPlusX = 113
const Magebind = 113
Keywords[MagebindPlusX] = "Magebind +X"
const Magecast = 114
Keywords[Magecast] = "Magecast"
const ManaDrainPlusX = 115
const ManaDrain = 115
Keywords[ManaDrainPlusX] = "Mana Drain +X"
const ManaTransferPlusX = 116
Keywords[ManaTransferPlusX] = "Mana Transfer +X"
const ManaTransfer = 116
Keywords[ManaTransfer] = "Mana Transfer"
const MeleePlusX = 117
Keywords[MeleePlusX] = "Melee +X"
const MeleeMinusX = 118
Keywords[MeleeMinusX] = "Melee -X"
const MeleeAttack = 119
Keywords[MeleeAttack] = "Melee Attack"
const MeleeAction = 120
Keywords[MeleeAction] = "Melee Action"
const MovingConjuration = 121
Keywords[MovingConjuration] = "Moving Conjuration"
const Nonliving = 122
Keywords[Nonliving] = "Nonliving"
const Novice = 123
Keywords[Novice] = "Novice"
const Obliterate = 124
Keywords[Obliterate] = "Obliterate"
const Obscured = 125
Keywords[Obscured] = "Obscured"
const OrAttack = 126
Keywords[OrAttack] = "Or Attack"
const PassageAttacks = 127
Keywords[PassageAttacks] = "Passage Attacks"
const PassageBlocked = 128
Keywords[PassageBlocked] = "Passage Blocked"
const Pest = 129
Keywords[Pest] = "Pest"
const PiercingPlusX = 130
Keywords[PiercingPlusX] = "Piercing +X"
const PoisonCondition = 131
Keywords[PoisonCondition] = "Poison Condition"
const PoisonDamage = 132
Keywords[PoisonDamage] = "Poison Damage"
const PoisonPlusX = 134
Keywords[PoisonPlusX] = "Poison +X"
const PoisonMinusX = 135
Keywords[PoisonMinusX] = "Poison -X"
const PoisonImmune = 136
Keywords[PoisonImmune] = "Poison Immunity"
const Prevent = 137
Keywords[Prevent] = "Prevent"
const Prey = 138
Keywords[Prey] = "Prey"
const PsychicDamage = 139
Keywords[PsychicDamage] = "Psychic Damage"
const PsychicPlusX = 140
Keywords[PsychicPlusX] = "Psychic +X"
const PsychicMinusX = 141
Keywords[PsychicMinusX] = "Psychic -X"
const PsychicImmune = 142
Keywords[PsychicImmune] = "Psychic Immunity"
const Push = 143
Keywords[Push] = "Push"
const RagePlusX = 144
Keywords[RagePlusX] = "Rage +X"
const Rage = 144
Keywords[Rage] = "Rage"
const RangedPlusX = 145
Keywords[RangedPlusX] = "Ranged +X"
const RangedMinusX = 146
Keywords[RangedMinusX] = "Ranged -X"
const RangedAttack = 147
Keywords[RangedAttack] = "Ranged Attack"
const RangedAction = 148
Keywords[RangedAction] = "Ranged Action"
const Reach = 149
Keywords[Reach] = "Reach"
const Reanimate = 150
Keywords[Reanimate] = "Reanimate"
const Reconstruct = 151
Keywords[Reconstruct] = "Reconstruct"
const RegenerateX = 152
const Regenerate = 152
Keywords[RegenerateX] = "Regenerate X"
const RemoveCondition = 153
Keywords[RemoveCondition] = "Remove Condition"
const RemoveFromTheGame = 154
Keywords[RemoveFromTheGame] = "Remove From The Game"
const Reroll = 155
Keywords[Reroll] = "Reroll"
const Resilient = 156
Keywords[Resilient] = "Resilient"
const Restrained = 157
Keywords[Restrained] = "Restrained"
const Rooted = 158
Keywords[Rooted] = "Rooted"
const Rot = 159
Keywords[Rot] = "Rot"
const Slam = 160
Keywords[Slam] = "Slam"
const Sleep = 161
Keywords[Sleep] = "Sleep"
const Slow = 162
Keywords[Slow] = "Slow"
const Snatch = 163
Keywords[Snatch] = "Snatch"
const Spawnpoint = 164
Keywords[Spawnpoint] = "Spawnpoint"
const Spellbind = 165
Keywords[Spellbind] = "Spellbind"
const Stuck = 166
Keywords[Stuck] = "Stuck"
const Stun = 167
Keywords[Stun] = "Stun"
const Suffocate = 168
Keywords[Suffocate] = "Suffocate"
const Sweeping = 169
Keywords[Sweeping] = "Sweeping"
const Tainted = 170
Keywords[Tainted] = "Tainted"
const Taunt = 171
Keywords[Taunt] = "Taunt"
const Teleport = 172
Keywords[Teleport] = "Teleport"
const Terrain = 173
Keywords[Terrain] = "Terrain"
const ToughMinusX = 174
Keywords[ToughMinusX] = "Tough -X"
const Tough = 174
Keywords[Tough] = "Tough"
const TrampleAttack = 175
Keywords[TrampleAttack] = "Trample Attack"
const Trap = 176
Keywords[Trap] = "Trap"
const Triplestrike = 177
Keywords[Triplestrike] = "Triplestrike"
const Unavoidable = 178
Keywords[Unavoidable] = "Unavoidable"
const Uncontainable = 179
Keywords[Uncontainable] = "Uncontainable"
const Unique = 180
Keywords[Unique] = "Unique"
const Unmovable = 181
Keywords[Unmovable] = "Unmovable"
const Unstoppable = 182
Keywords[Unstoppable] = "Unstoppable"
const UpkeepPlusX = 183
const Upkeep = 183
Keywords[UpkeepPlusX] = "Upkeep +X"
const UprootX = 184
const Uproot = 184
Keywords[UprootX] = "Uproot X"
const Valor = 185
Keywords[Valor] = "Valor"
const Vampiric = 186
Keywords[Vampiric] = "Vampiric"
const Vigilant = 187
Keywords[Vigilant] = "Vigilant"
const VineMarker = 188
Keywords[VineMarker] = "Vine Marker"
const Wall = 189
Keywords[Wall] = "Wall"
const Weak = 190
Keywords[Weak] = "Weak"
const ZoneExclusive = 191
Keywords[ZoneExclusive] = "Zone Exclusive"
const WindDamage = 192
Keywords[WindDamage] = "Wind Damage"
const WindPlusX = 193
Keywords[WindPlusX] = "Wind +X"
const WindMinusX = 194
Keywords[WindMinusX] = "Wind -X"
const WindImmune = 195
Keywords[WindImmune] = "Wind Immunity"
const Zombie = 196
Keywords[Zombie] = "Zombie"
const ZoneAttack = 197
Keywords[ZoneAttack] = "Zone Attack"
const ZoneAction = 198
Keywords[ZoneAction] = "Zone Action"
const CantHaveArmor = 199
Keywords[CantHaveArmor] = "Can't Have Armor"
const Anchored = 200
Keywords[Anchored] = "Anchored"
const AcidDamage = 201
Keywords[AcidDamage] = "Acid Damage"
const AcidPlusX = 202
Keywords[AcidPlusX] = "Acid +X"
const AcidMinusX = 203
Keywords[AcidMinusX] = "Acid -X"
const AcidImmune = 204
Keywords[AcidImmune] = "Acid Immunity"




/*List of cards that exist
Relevant information:
    Broad (all cards): Name, Text, Type, Subtype(s), Casting Cost, Speed (Quick/Full action), Range, Target, Level(s) (i.e. "1 fire and 1 nature" or "1 fire or 1 nature"),
        Keywords (i.e. melee +x), Attack Info, Defense Info
    Info for each attack: Name, Speed, Ranged/Melee/Zone, Range, Damage Type, Number of Die, Effect Roll, Keywords (Ethereal, +2 vs Flying)
    Info for each defense: Roll needed, number of uses, works vs melee, works vs ranged, other specifications
    Enchantments: Reveal Cost
    Equipment: Equipment Slot
    Creature: Armor, Life

Format: (USE "NONE" WHEN NO VALUE APPLIES FOR STRINGS and -1 FOR INTEGERS (i.e. subtype 4 on all cards, equipment slot when not equipment, etc.) BUT ALWAYS PUT EVERY ARRAY THAT EXISTS (i.e. a card with no subtype should still have a subtype array with 4 NONEs in it rather than a NONE in place of an array))
[Name, Type, [Subtype 1, Subtype 2, Subtype 3, Subtype 4], Casting Cost, Reveal Cost (Use -1 for non-enchantments), Speed, Min Range, Max Range, Target, 
[Total Level, Level Part 1, Level Part 2, Level Part 3, Level Part 4], [Keyword 1, Keyword 2, ..., Keyword 12], [Attack Info 1, Attack Info 2, Attack Info 3, Attack Info 4],
[Defense Info 1, Defense Info 2], Equipment Slot, Armor, Life, OtherText]

Format for Subarrays:
Level Part: [Number of levels in part, type 1, type 2, type 3, type 4, type 5] - AND types have multiple level parts, OR types are in one part
ex. The level array for a card that is level 3 fire, level 1 earth, and level 1 in either arcane or nature would look like [5, [3, FIRE, NONE, NONE, NONE, NONE], [1, EARTH, NONE, NONE, NONE, NONE], [1, ARCANE, NATURE, NONE, NONE, NONE], [0, NONE, NONE, NONE, NONE, NONE]]

Attack Info: [Name, Speed, Ranged/Melee/Zone, Min Range, Max Range, Damage Type, Number of Die, Effect Roll, Text]
Effect Roll: [[Effect Roll Minimum for Effect 1 (USE -1 for NONE), Effect 1], ..., [Effect Roll Minimum for Effect 4, Effect 4]]

Defense Info: [Roll Needed, Num Uses, Works VS Melee/Ranged/All, Text]

example card: asto vidatu, angel slayer:
["Asto Vidatu, Angel Slayer", Creature, ["Manticore", "NONE", "NONE", "NONE"], 20, -1, Full, 0, 0, "Zone", [5, [3, "Arcane", "NONE", "NONE", "NONE", "NONE"], [2, "Dark", "NONE", "NONE", "NONE", "NONE"], [0, "NONE", "NONE", "NONE", "NONE", "NONE"], [0, "NONE", "NONE", "NONE", "NONE", "NONE"]], ["Cripple", "Piercing +X", "Weak", "Flying", "Legendary", "Tough -X", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE", "NONE"], ["Claws", "Quick", "Melee", 0, 0, "Physical", 5, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"], ["Toxic Spines", "Full", "Ranged", 0, 1, "Physical", 2, [8, "Cripple"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "Piercing +1"], ["Poison Stinger", "Full", "Melee", 0, 0, "Physical", 2, [5, "Weak"], [9, "2 Weak"], [-1, "NONE"], [-1, "NONE"], "Piercing +1"], ["NONE", "NONE", "NONE", -1, -1, "NONE", -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"], [[-1, -1, "NONE", "NONE"], [-1, -1, "NONE", "NONE"]], "NONE", 2, 14]


Blank template:
["NAME", TYPE, ["NONE", "NONE", "NONE", "NONE"], COST, -1, ACTION, 0, 0, "TARGET", [-1, [0, SCHOOL, SCHOOL, SCHOOL, SCHOOL, SCHOOL], [0, SCHOOL, SCHOOL, SCHOOL, SCHOOL, SCHOOL], [0, SCHOOL, SCHOOL, SCHOOL, SCHOOL, SCHOOL], [0, SCHOOL, SCHOOL, SCHOOL, SCHOOL, SCHOOL]], [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD], ["NONE", ACTION, MELEERANGEDZONETRAMPLEANY, -1, -1, DamageType, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"], ["NONE", ACTION, MELEERANGEDZONETRAMPLEANY, -1, -1, DamageType, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"], ["NONE", ACTION, MELEERANGEDZONETRAMPLEANY, -1, -1, DamageType, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"], ["NONE", ACTION, MELEERANGEDZONETRAMPLEANY, -1, -1, DamageType, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"], [[-1, -1, MELEERANGEDZONETRAMPLEANY, "NONE"], [-1, -1, MELEERANGEDZONETRAMPLEANY, "NONE"]], SLOT, -1, -1]
*/
const BlankLevelPart = [0, SCHOOL, SCHOOL, SCHOOL, SCHOOL, SCHOOL];
const BlankAttack = ["NONE", ACTION, MELEERANGEDZONETRAMPLEANY, -1, -1, DamageType, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"];
const BlankAttacks = [BlankAttack, BlankAttack, BlankAttack, BlankAttack];
const BlankDefense = [-1, -1, MELEERANGEDZONETRAMPLEANY, "NONE"];
const BlankDefenses = [BlankDefense, BlankDefense];
const BlankSubtype = ["NONE", "NONE", "NONE", "NONE"];
const cards = [                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    //Attack Spells:
    //Air Primary:
    ["Arc Lightning",         AttackSpell, ["Lightning", "NONE", "NONE", "NONE"],    5,  -1, Quick, 0, 1, "Creature or Conjuration",            [1, [1, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [RangedAttack, Condition, Daze, Stun, LightningDamage, Ethereal, Unavoidable, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],          [["NONE", ACTION, Ranged, 0, 1, Lightning, 3, [7, "Daze"],   [9, "Stun"],           [-1, "NONE"],        [-1, "NONE"], "Ethereal, Unavoidable"],                             BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Bolt of V'Tar",         AttackSpell, ["V'Tar", "Lightning", "NONE", "NONE"],   8,  -1, Quick, 0, 2, "Creature or Conjuration",            [2, [2, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [RangedAttack, Condition, Daze, Stun, LightningDamage, Ethereal, ManaDrainPlusX, PiercingPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD], [["NONE", ACTION, Ranged, 0, 2, Lightning, 3, [6, "Daze"],   [8, "Stun"],           [-1, "NONE"],        [-1, "NONE"], "Ethereal"],                                          BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "This attack gains the Mana Drain +X and Piercing +X traits. X is the number of V'tar Orbs you control."],                                                                                                      
    ["Chain Lightning",       AttackSpell, ["Lightning", "NONE", "NONE", "NONE"],    12, -1, Full,  0, 1, "Creature or Conjuration",            [3, [3, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [RangedAttack, Condition, Daze, Stun, LightningDamage, Ethereal, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],              [["NONE", ACTION, Ranged, 0, 1, Lightning, 5, [5, "Daze"],   [8, "Stun"],           [-1, "NONE"],        [-1, "NONE"], "Ethereal"],                                          BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "Each time Chain Lightning damages a target, it may attack another target. That target must be in LoS of the last target, and may be up to 1 zone away from that target. Each successive attack rolls 1 fewer attack dice, and subtracts 1 more from the effect die roll. Chain Lightning can't attack the same target twice."],                                                                                                      
    ["Electrify",             AttackSpell, ["Lightning", "NONE", "NONE", "NONE"],    9,  -1, Full,  0, 0, "Zone",                               [2, [2, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [RangedAttack, ZoneAttack, Condition, Daze, Stun, LightningDamage, Ethereal, Unavoidable, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],       [["NONE", ACTION, Zone,   0, 0, Lightning, 4, [7, "Daze"],   [9, "Stun"],           [-1, "NONE"],        [-1, "NONE"], "Ethereal, Unavoidable"],                             BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "Attacks all objects in the zone except the caster."],                                                                                                      
    ["Jet Stream",            AttackSpell, ["Wind", "NONE", "NONE", "NONE"],         4,  -1, Quick, 0, 2, "Creature or Conjuration",            [1, [1, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [RangedAttack, Condition, Daze, Push, WindDamage, Ethereal, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                   [["NONE", ACTION, Ranged, 0, 2, Wind,      2, [4, "Push"],   [11, "Push & Daze"],   [-1, "NONE"],        [-1, "NONE"], "Ethereal, +2 vs. Flying"],                           BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Lightning Bolt",        AttackSpell, ["Lightning", "NONE", "NONE", "NONE"],    8,  -1, Quick, 0, 2, "Creature or Conjuration",            [2, [2, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [RangedAttack, Condition, Daze, Stun, LightningDamage, Ethereal, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],              [["NONE", ACTION, Ranged, 0, 2, Lightning, 5, [6, "Daze"],   [8, "Stun"],           [-1, "NONE"],        [-1, "NONE"], "Ethereal"],                                          BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Sandstorm",             AttackSpell, ["Wind", "NONE", "NONE", "NONE"],         8,  -1, Full,  0, 2, "Zone",                               [2, [1, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], [1, Earth, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart], [RangedAttack, ZoneAttack, Condition, Daze, Push, WindDamage, Unavoidable, PiercingPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],       [["NONE", ACTION, Zone,   0, 2, Wind,      2, [4, "Push"],   [7, "Daze"],           [10, "Push & Daze"], [-1, "NONE"], "Piercing +1, +2 vs. Flying, Unavoidable"],           BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "If Pushed, roll for random direction."],                                                                                                      
    ["Thunderbolt",           AttackSpell, ["Lightning", "NONE", "NONE", "NONE"],    10, -1, Full,  0, 3, "Creature or Conjuration",            [3, [3, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [RangedAttack, Condition, Daze, Stun, LightningDamage, Ethereal, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],              [["NONE", ACTION, Ranged, 0, 3, Lightning, 6, [4, "Daze"],   [7, "Stun"],           [-1, "NONE"],        [-1, "NONE"], "Ethereal"],                                          BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Windstorm",             AttackSpell, ["Wind", "NONE", "NONE", "NONE"],         4,  -1, Full,  0, 1, "Creature or Conjuration",            [1, [1, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [RangedAttack, Condition, Push, Sweeping, WindDamage, Ethereal, Unavoidable, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],           [["NONE", ACTION, Ranged, 0, 1, Wind,      2, [6, "Push"],   [-1, "NONE"],          [-1, "NONE"],        [-1, "NONE"], "Sweeping, Unavoidable, +2 vs. Flying, Ethereal"],    BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      

    //Arcane Primary:
    ["V'Tarrian Energy Wave", AttackSpell, ["V'Tar", "NONE", "NONE", "NONE"],        12, -1, Full,  0, 2, "2 Adjacent Zones",                   [3, [3, Arcane, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                          [RangedAttack, ZoneAttack, Unavoidable, Ethereal, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],           [["NONE", ACTION, Zone,   0, 2, Typeless,  2, [-1, "NONE"],  [-1, "NONE"],          [-1, "NONE"],        [-1, "NONE"], "Unavoidable, Ethereal"],                             BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "This attack rolls 1 extra die for each V'Tar Orb you control. It also affects any wall between the 2 targeted zones."],                                                                                                      

    //Dark Primary:
    ["Devil's Trident",       AttackSpell, ["Flame", "NONE", "NONE", "NONE"],        7,  -1, Quick, 0, 1, "Creature",                           [2, [1, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], [1, Fire, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart], [RangedAttack, Condition, Burn, Cripple, Defrost, FlameDamage, PiercingPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],          [["NONE", ACTION, Ranged, 0, 1, Flame,    4, [3, "Cripple"], [6, "Cripple & Burn"], [9, "Burn"],         [-1, "NONE"], "Piercing +2, Defrost"],                              BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      

    //Earth Primary:
    ["Hail of Stones",        AttackSpell, ["NONE", "NONE", "NONE", "NONE"],         8,  -1, Full,  0, 1, "Zone",                               [2, [2, Earth, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                           [RangedAttack, ZoneAttack, Condition, Daze, Stun, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                    [["NONE", ACTION, Zone,   0, 1, Typeless, 4, [6, "Daze"],    [11, "Stun"],           [-1, "NONE"],        [-1, "NONE"], "NONE"],                                              BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Hurl Boulder",          AttackSpell, ["NONE", "NONE", "NONE", "NONE"],         8,  -1, Quick, 0, 2, "Creature or Conjuration",            [2, [2, Earth, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                           [RangedAttack, Condition, Slam, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                    [["NONE", ACTION, Ranged, 0, 2, Typeless, 7, [8, "Slam"],    [-1, "NONE"],           [-1, "NONE"],        [-1, "NONE"], "NONE"],                                              BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Hurl Meteorite",        AttackSpell, ["NONE", "NONE", "NONE", "NONE"],         12, -1, Full,  0, 3, "Creature or Conjuration",            [3, [3, Earth, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                           [RangedAttack, Condition, Daze, Stun, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                       [["NONE", ACTION, Ranged, 0, 3, Typeless, 9, [5, "Daze"],    [9, "Stun"],            [-1, "NONE"],        [-1, "NONE"], "NONE"],                                              BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Hurl Rock",             AttackSpell, ["NONE", "NONE", "NONE", "NONE"],         4,  -1, Quick, 0, 1, "Creature or Conjuration",            [1, [1, Earth, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                           [RangedAttack, Condition, Daze, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                    [["NONE", ACTION, Ranged, 0, 1, Typeless, 5, [9, "Daze"],    [-1, "NONE"],           [-1, "NONE"],        [-1, "NONE"], "NONE"],                                              BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      

    //Fire Primary:
    ["Dragon's Breath",       AttackSpell, ["Flame", "NONE", "NONE", "NONE"],        12, -1, Full,  0, 3, "Creature or Conjuration",            [3, [3, Fire, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RangedAttack, Condition, Burn, Defrost, FlameDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                [["NONE", ACTION, Ranged, 0, 3, Flame,    4, [3, "Burn"],    [10, "2 Burn"],        [-1, "NONE"],        [-1, "NONE"], "Defrost"],                                           BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "At the end of the attack, as part of the same attack action, Dragon's Breath may attack a second target (similar to a Sweeping attack). The second target must be in an adjacent zone, 1 zone farther away than the first target. Both targets must be within range."],                                                                                                      
    ["Fireball",              AttackSpell, ["Flame", "NONE", "NONE", "NONE"],        8,  -1, Quick, 0, 2, "Creature or Conjuration",            [2, [2, Fire, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RangedAttack, Condition, Burn, Defrost, FlameDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                [["NONE", ACTION, Ranged, 0, 2, Flame,    6, [4, "Burn"],    [11, "2 Burn"],        [-1, "NONE"],        [-1, "NONE"], "Defrost"],                                           BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Firestorm",             AttackSpell, ["Flame", "NONE", "NONE", "NONE"],        11, -1, Full,  0, 1, "Zone",                               [3, [3, Fire, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RangedAttack, ZoneAttack, Condition, Burn, Defrost, FlameDamage, Unavoidable, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],         [["NONE", ACTION, Zone,   0, 1, Flame,    5, [5, "Burn"],    [10, "2 Burn"],        [-1, "NONE"],        [-1, "NONE"], "Defrost, Unavoidable"],                              BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Flameblast",            AttackSpell, ["Flame", "NONE", "NONE", "NONE"],        5,  -1, Quick, 0, 1, "Creature or Conjuration",            [1, [1, Fire, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RangedAttack, Condition, Burn, Defrost, FlameDamage, Unavoidable, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],            [["NONE", ACTION, Ranged, 0, 1, Flame,    4, [7, "Burn"],    [11, "2 Burn"],        [-1, "NONE"],        [-1, "NONE"], "Unavoidable, Defrost"],                              BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Ring of Fire",          AttackSpell, ["Flame", "NONE", "NONE", "NONE"],        9,  -1, Full,  0, 0, "Zone",                               [2, [2, Fire, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RangedAttack, ZoneAttack, Condition, Burn, Defrost, FlameDamage, Unavoidable, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],         [["NONE", ACTION, Zone,   0, 0, Flame,    5, [7, "Burn"],    [11, "2 Burn"],        [-1, "NONE"],        [-1, "NONE"], "Unavoidable, Defrost"],                              BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "Attacks all objects in the zone except the caster."],                                                                                                      

    //Holy Primary:
    ["Blinding Flash",        AttackSpell, ["Light", "NONE", "NONE", "NONE"],        7,  -1, Full,  0, 0, "Zone",                               [2, [2, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RangedAttack, ZoneAttack, Condition, Daze, Stun, Ethereal, Unavoidable, LightDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],           [["NONE", ACTION, Zone,   0, 0, Light,    2, [4, "Daze"],    [10, "Stun"],           [-1, "NONE"],        [-1, "NONE"], "Ethereal, Unavoidable, +2 vs. Nonliving Creatures"], BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "Attacks all objects in the zone except the caster."],                                                                                                      
    ["Luminous Blast",        AttackSpell, ["Light", "NONE", "NONE", "NONE"],        5,  -1, Quick, 0, 0, "Creature or Conjuration",            [1, [1, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RangedAttack, Condition, Daze, Stun, Ethereal, LightDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                  [["NONE", ACTION, Ranged, 0, 0, Light,    5, [4, "Daze"],    [11, "Stun"],           [-1, "NONE"],        [-1, "NONE"], "Ethereal"],                                          BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Pillar of Light",       AttackSpell, ["Light", "NONE", "NONE", "NONE"],        5,  -1, Quick, 0, 2, "Creature or Conjuration",            [1, [1, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RangedAttack, Condition, Daze, Stun, Ethereal, LightDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                  [["NONE", ACTION, Ranged, 0, 2, Light,    2, [4, "Daze"],    [11, "Stun"],           [-1, "NONE"],        [-1, "NONE"], "Ethereal, +2 vs. Nonliving Creatures"],              BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Sunfire Burst",         AttackSpell, ["Light", "NONE", "NONE", "NONE"],        5,  -1, Quick, 0, 1, "Creature or Conjuration",            [1, [1, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RangedAttack, Condition, Daze, Burn, Ethereal, Unavoidable, LightDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],              [["NONE", ACTION, Ranged, 0, 1, Light,    2, [6, "Daze"],    [8, "Daze & Burn"],     [-1, "NONE"],        [-1, "NONE"], "Ethereal, Unavoidable, +2 vs. Nonliving Creatures"], BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      

    //Mind Primary:
    ["Force Hammer",          AttackSpell, ["Force", "NONE", "NONE", "NONE"],        9,  -1, Quick, 0, 2, "Creature or Conjuration",            [2, [2, Mind, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RangedAttack, Condition, Slam, Ethereal, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                   [["NONE", ACTION, Ranged, 0, 2, Typeless, 6, [8, "Slam"],    [-1, "NONE"],           [-1, "NONE"],        [-1, "NONE"], "Ethereal, +2 vs. Corporeal Conjurations"],           BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Invisible Fist",        AttackSpell, ["Force", "NONE", "NONE", "NONE"],        4,  -1, Quick, 0, 1, "Creature or Conjuration",            [1, [1, Mind, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RangedAttack, Condition, Daze, Ethereal, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                   [["NONE", ACTION, Ranged, 0, 1, Typeless, 4, [8, "Daze"],    [-1, "NONE"],           [-1, "NONE"],        [-1, "NONE"], "Ethereal"],                                          BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      

    //Nature Primary (None):

    //War Primary (None):

    //Water Primary:
    ["Acid Ball",             AttackSpell, ["Acid", "NONE", "NONE", "NONE"],         5,  -1, Quick, 0, 2, "Creature or Conjuration",            [1, [1, Water, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                           [RangedAttack, Condition, Corrode, AcidDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],              [["NONE", ACTION, Ranged, 0, 2, Acid,     3, [1, "Corrode"], [5, "2 Corrode"],      [-1, "NONE"],        [-1, "NONE"], "NONE"],                                               BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Geyser",                AttackSpell, ["Hydro", "NONE", "NONE", "NONE"],        4,  -1, Quick, 0, 1, "Creature or Conjuration",            [1, [1, Water, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                           [RangedAttack, Condition, Daze, Unavoidable, HydroDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],            [["NONE", ACTION, Ranged, 0, 1, Hydro,    3, [5, "Daze"],    [-1, "NONE"],          [-1, "NONE"],        [-1, "NONE"], "Unavoidable"],                                        BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "During the Roll Dice Step of this attack, if the target has any Burn conditions on it, cancel this attack and remove all Burn conditions from the target instead."],                                                                                                      
    ["Surging Wave",          AttackSpell, ["Hydro", "NONE", "NONE", "NONE"],        5,  -1, Quick, 0, 2, "Non-Flying Creature or Conjuration", [1, [1, Water, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                           [RangedAttack, Condition, Slam, Push, Extinguish, Unavoidable, HydroDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],            [["NONE", ACTION, Ranged, 0, 2, Hydro,    3, [3, "Slam"],    [8, "Push & Slam"],    [-1, "NONE"],        [-1, "NONE"], "Extinguish, Unavoidable"],                            BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Swell",                 AttackSpell, ["Hydro", "NONE", "NONE", "NONE"],        4,  -1, Quick, 0, 2, "Non-Flying Creature or Conjuration", [1, [1, Water, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                           [RangedAttack, Condition, Push, Extinguish, Unavoidable, HydroDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],         [["NONE", ACTION, Ranged, 0, 2, Hydro,    3, [7, "Push"],    [-1, "NONE"],          [-1, "NONE"],        [-1, "NONE"], "Extinguish, Unavoidable"],                            BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      
    ["Tsunami",               AttackSpell, ["Hydro", "NONE", "NONE", "NONE"],        14, -1, Full,  0, 1, "Zone",                               [3, [3, Water, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                           [RangedAttack, ZoneAttack, Condition, Push, Extinguish, Unavoidable, HydroDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],      [["NONE", ACTION, Zone,   0, 1, Hydro,    3, [5, "Push"],    [-1, "NONE"],          [-1, "NONE"],        [-1, "NONE"], "Extinguish, Unavoidable"],                            BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "When Tsunami is cast, choose a direction. After the attack resolves, repeat the attack one zone further away in the chosen direction. This continues until there are no farther zones. Flying creatures are immune to Tsunami."],                                                                                                      


    //Creatures:
    //["NAME", Creature, ["NONE", "NONE", "NONE", "NONE"], COST, -1, Full, 0, 0, "Zone", [-1, [0, SCHOOL, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart], [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD], ["NONE", ACTION, MELEERANGEDZONETRAMPLEANY, -1, -1, DamageType, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"], BlankAttack, BlankAttack, BlankAttack, BlankDefenses, SLOT, -1, -1, ""]                                                                                                      
    //Air Primary:
    ["Whirling Spirit", Creature, ["Wind", "NONE", "NONE", "NONE"], 12, -1, Full, 0, 0, "Zone", [4, [4, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart], [MeleeAttack, Incorporeal, Ethereal, Push, Daze, Condition, WindDamage, UpkeepPlusX, Nonliving, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD], [["Windstorm", Quick, Melee, 0, 0, Wind, 4, [7, "Push"], [11, "Push & Daze"], [-1, "NONE"], [-1, "NONE"], "Ethereal, +2 vs. Incorporeal"], BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, 13, "Upkeep +1, Incorporeal, Nonliving.  "],                                                                                                      

    //Arcane Primary:

    //Dark Primary:
    ["Acolyte of the Bog Queen",       Creature, ["Dark Elf", "Cleric", "NONE", "NONE"],    5,  -1, Full, 0, 0, "Zone", [1, [1, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, RangedAction, Reconstruct, Zombie, MeleePlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                        [["Sacrificial Knife", Quick, Melee,  0, 0, Typeless, 2, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       ["Repair Bones", Full, NonAttackRanged, 0, 1, NoDamage, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "Reconstruct 2 damage from target skeleton object."], ["Vigor of the Grave", Full, NonAttackRanged, 0, 1, NoDamage, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "Target zombie creature gains the Melee +1 trait until end of round."], BlankAttack], BlankDefenses,                       SLOT, 0, 7,  "NONE"],                                                                                                      
    ["Adramelech, Lord of Fire",       Creature, ["Demon", "NONE", "NONE", "NONE"],         24, -1, Full, 0, 0, "Zone", [6, [4, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], [2, Fire, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart], [MeleeAttack, FlameDamage, Condition, Burn, Defrost, Sweeping, Flying, FlameImmune, Legendary, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                          [["Hellfire Scythe",   Quick, Melee,  0, 0, Flame,    6, [5, "Burn"],    [10, "2 Burn"], [-1, "NONE"], [-1, "NONE"], "Defrost"],                    ["Hellfire Sweep", Full, Melee, 0, 0, Flame, 4, [7, "Burn"], [11, "2 Burn"], [-1, "NONE"], [-1, "NONE"], "Sweeping, Defrost"],                                            BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 3, 14, "Flying * Flame Immunity * Legendary.  "],                                                                                                      
    ["Blood Demon",                    Creature, ["Vampire", "Demon", "NONE", "NONE"],      12, -1, Full, 0, 0, "Zone", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Vampiric, BloodthirstyPlusX, Flying, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                         [["Gorging Bite",      Quick, Melee,  0, 0, Typeless, 3, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Vampiric"],                   BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 1, 11, "Bloodthirsty +1 * Flying.  "],                                                                                                      
    ["Cerberus",                       Creature, ["Demon", "Canine", "NONE", "NONE"],       17, -1, Full, 0, 0, "Zone", [4, [4, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, PiercingPlusX, FlameMinusX, ToughMinusX, Legendary, Guard, Unmovable, Triplestrike, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],              [["Bite",              Quick, Melee,  0, 0, Typeless, 3, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +1"],                BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 3, 13, "Flame -2 * Tough -3 * Legendary.  While Cerberus is guarding in a zone with a friendly Dark conjuration, he gains the Unmovable trait and his attack gains the Triplestrike trait."],                                                                                                      
    ["Dark Pact Slayer",               Creature, ["Demon", "NONE", "NONE", "NONE"],         13, -1, Full, 0, 0, "Zone", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, PiercingPlusX, FlameMinusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                         [["Hellsword",         Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +2"],                BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 2, 14, "Flame -2.  "],                                                                                                      
    ["Darkfenne Bat",                  Creature, ["Animal", "Bat", "NONE", "NONE"],         5,  -1, Full, 0, 0, "Zone", [1, [1, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Rot, Condition, Flying, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                                      [["Diseased Bite",     Quick, Melee,  0, 0, Typeless, 2, [9, "Rot"],     [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 0, 4,  "Flying.  "],                                                                                                      
    ["Deathfang",                      Creature, ["Undead", "Skeleton", "Canine", "NONE"],  8,  -1, Full, 0, 0, "Zone", [2, [2, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, PiercingPlusX, Fast, Nonliving, PsychicImmune, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                        [["Bite",              Quick, Melee,  0, 0, Typeless, 3, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +1"],                BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 0, 9,  "Fast * Nonliving * Psychic Immunity.  "],                                                                                                      
    ["Drokarr",                        Creature, ["Demon", "NONE", "NONE", "NONE"],         14, -1, Full, 0, 0, "Zone", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Grapple, Condition, PiercingPlusX, Prey, AdditionalAttackDice, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                 [["Wrenching Claws",   Quick, Melee,  0, 0, Typeless, 2, [5, "Grapple"], [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       ["Tail Spike", Full, Melee, 0, 0, Typeless, 4, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "Piercing +2"],                                                    BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 2, 11, "The Tail Spike attack rolls 2 additional attack dice when attacking the Drokarr's prey."],                                                                                                      
    ["Flaming Hellion",                Creature, ["Demon", "NONE", "NONE", "NONE"],         13, -1, Full, 0, 0, "Zone", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, RangedAttack, FlameDamage, Burn, Condition, Defrost, FlameImmune, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                       [["Flameblast",        Full,  Ranged, 1, 1, Flame,    3, [5, "Burn"],    [10, "2 Burn"], [-1, "NONE"], [-1, "NONE"], "Defrost"],                    ["Hell Trident", Quick, Melee, 0, 0, Flame, 4, [7, "Burn"], [11, "2 Burn"], [-1, "NONE"], [-1, "NONE"], "Defrost"],                                                       BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 2, 9,  "Flame Immunity.  "],                                                                                                      
    ["Goran, Werewolf Pet",            Creature, ["Lycanthrope", "Canine", "NONE", "NONE"], 15, -1, Full, 0, 0, "Zone", [4, [4, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Doublestrike, BloodthirstyPlusX, Legendary, WarlockOnly, Mage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                 [["Fangs",             Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       ["Feral Claws", Full, Melee, 0, 0, Typeless, 3, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "Doublestrike"],                                                  BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 3, 12, "Bloodthirsty +1 * Legendary * Warlock Only.  Goran gains an additional Bloodthirsty +1 trait while in the same zone as his controlling Mage."],                                                                                                      
    ["Grey Wraith",                    Creature, ["Spirit", "NONE", "NONE", "NONE"],        10, -1, Full, 0, 0, "Zone", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Weak, Condition, Ethereal, UpkeepPlusX, Incorporeal, Nonliving, Teleport, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                        [["Hand of Death",     Quick, Melee,  0, 0, Typeless, 3, [5, "Weak"],    [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Ethereal"],                   BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, -1, 8,  "Upkeep +1 * Ethereal * Nonliving.  Instead of taking a move action, Grey Wraith may pay 1 mana to teleport to an adjacent zone."],                                                                                                      
    ["Ichthellid",                     Creature, ["Undead", "Insect", "NONE", "NONE"],      9,  -1, Full, 0, 0, "Zone", [2, [2, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, PiercingPlusX, Nonliving, PsychicImmune, Climbing, IchthellidLarva, Condition, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],          [["Impregnating Bite", Quick, Melee,  0, 0, Typeless, 3, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +1"],                BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 2, 5,  "Nonliving * Psychic Immunity * Climbing.  Ichthellid comes into play with an egg token on it. When Ichthellid's attack damages, but does not destroy, a Living creature, you may pay 1 mana and remove the egg token to place an Ichthellid Larva marker on that creature."],                                                                                                      
    ["Infernian Scourger",             Creature, ["Demon", "NONE", "NONE", "NONE"],         9,  -1, Full, 0, 0, "Zone", [2, [2, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, PiercingPlusX, Counterstrike, FlameMinusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                   [["Claws",             Quick, Melee,  0, 0, Typeless, 3, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +1, Counterstrike"], BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 1, 8,  "Flame -2.  "],                                                                                                      
    ["Malacoda",                       Creature, ["Demon", "NONE", "NONE", "NONE"],         16, -1, Full, 0, 0, "Zone", [4, [4, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, PiercingPlusX, Slow, Legendary, Living, DirectDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                          [["Talons",            Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +1"],                BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 3, 13, "Slow * Legendary.  Each Upkeep Phase, all other Living creatures in Malacoda's zone recieve 2 points of direct damage."],                                                                                                      
    ["Mort",                           Creature, ["Undead", "Skeleton", "Soldier", "NONE"], 16, -1, Full, 0, 0, "Zone", [4, [4, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Tainted, Condition, Nonliving, PsychicImmune, Legendary, Reconstruct, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                   [["Dark Cursed Sword", Quick, Melee,  0, 0, Typeless, 4, [8, "Tainted"], [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 1, 13, "Nonliving * Psychic Immunity * Legendary.  Each Upkeep Phase, each friendly skeleton object, in or bordering Mort's zone, may Reconstruct up to 2 damage."],                                                                                                      
    ["Necropian Vampiress",            Creature, ["Vampire", "NONE", "NONE", "NONE"],       16, -1, Full, 0, 0, "Zone", [4, [4, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Vampiric, FrostMinusX, Flying, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                               [["Fangs",             Quick, Melee,  0, 0, Typeless, 5, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Vampiric"],                   BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 2, 15, "Frost -2.  When this creature is activated, you may pay 1 mana to give her the Flying trait until the end of her Action Phase."],                                                                                                      
    ["Plague Zombie",                  Creature, ["Undead", "Zombie", "NONE", "NONE"],      9,  -1, Full, 0, 0, "Zone", [2, [2, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Rot, Condition, BloodthirstyPlusX, Lumbering, Pest, Resilient, PsychicImmune, Nonliving, Destroy, Living, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                   [["Diseased Strike",   Quick, Melee,  0, 0, Typeless, 2, [8, "Rot"],     [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 0, 4,  "Bloodthirsty +1 * Lumbering * Pest * Resilient * Psychic Immunity * Nonliving.  When Plague Zombie is destroyed, place a Rot condition on each Living creature in its zone."],                                                                                                      
    ["Ravenous Ghoul",                 Creature, ["Undead", "NONE", "NONE", "NONE"],        13, -1, Full, 0, 0, "Zone", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Fast, PsychicImmune, Nonliving, Corporeal, Destroy, RemoveFromTheGame, Growth, Condition, DiscardPile, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],             [["Bite",              Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +1"],                BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 2, 9,  "Fast * Psychic Immunity * Nonliving.  If a Corporeal creature was destroyed this round, and Ravenous Ghoul is in (or moves to) the zone it was destroyed in, as a quick action it may take that creature from its discard pile and remove it from the game to gain a growth marker."],                                                                                                      
    ["Sardonyx, Blight of the Living", Creature, ["Undead", "Skeleton", "Dragon", "NONE"],  24, -1, Full, 0, 0, "Zone", [8, [8, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, ZoneAttack, PiercingPlusX, Sweeping, Rot, Condition, Unavoidable, PoisonDamage, PsychicImmune, Unstoppable, Nonliving, Legendary, FiniteLife, Living, KEYWORD],  [["Crushing Jaw",      Quick, Melee,  0, 0, Typeless, 5, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +2"],                ["Tail Sweep", Full, Melee, 0, 0, Typeless, 5, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "Sweeping"],                                                       ["Poison Breath", Full, Zone, 0, 1, Poison, 2, [8, "Rot"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "Unavoidable"],                                                                              BlankAttack], BlankDefenses,                       SLOT, 0, 31, "Psychic Immunity * Unstoppable * Nonliving * Legendary.  Each Upkeep Phase Sardonyx's controller loses 2 Life. Living creatures in the same zone as Sardonyx gain the Finite Life trait."],                                                                                                      
    ["Sersiryx, Imp Familiar",         Creature, ["Demon", "NONE", "NONE", "NONE"],         12, -1, Full, 0, 0, "Zone", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Channeling, Burn, Condition, FlameDamage, Defrost, Familiar, FlameMinusX, Legendary, WarlockOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                  [["Singe",             Quick, Melee,  0, 0, Flame,    2, [7, "Burn"],    [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Defrost"],                    BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 2, 9,  "Channeling 1 * Familiar * Flame -2 * Legendary * Warlock Only.  Sersiryx can cast only Level 1-2 Fire attack spells, or Level 1-2 curse enchantments."],                                                                                                      
    ["Shaggoth-Zora",                  Creature, ["Undead", "Zombie", "NONE", "NONE"],      8,  -1, Full, 0, 0, "Zone", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, BloodthirstyPlusX, Lumbering, PsychicImmune, Nonliving, Legendary, Obliterate, Growth, Condition, Zombie, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],          [["Mangling Claws",    Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 0, 6,  "Bloodthirsty +1 * Lumbering * Resilient * Psychic Immunity * Nonliving * Legendary.  When Shaggoth-Zora is activated, it may Obliterate 1 friendly zombie creature in its zone to place a Growth marker on itself. It can have a maximum of 6 Growth markers."],                                                                                                          
    ["Skeelax, Taunting Imp",          Creature, ["Demon", "NONE", "NONE", "NONE"],         11, -1, Full, 0, 0, "Zone", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Taunt, Condition, Defense, FlameMinusX, Legendary, WarlockOnly, Burn, RegenerateX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                        [["Trident",           Quick, Melee,  0, 0, Typeless, 2, [5, "Taunt"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], [[6, 1, Any, "NONE"], BlankDefense], SLOT, 1, 9,  "Flame -2 * Legendary * Warlock Only.  During the Upkeep Phase, while Skeelax is in the same zone as an object with a Burn Condition, he gains the Regenerate 2 trait."],                                                                                                      
    ["Skeletal Archer",                Creature, ["Undead", "Skeleton", "Soldier", "NONE"], 11, -1, Full, 0, 0, "Zone", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, RangedAttack, Nonliving, PsychicImmune, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                      [["Bow",               Full,  Ranged, 1, 2, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       ["Fist", Quick, Melee, 0, 0, Typeless, 2, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"],                                                                BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 0, 9,  "Nonliving * Psychic Immunity.  "],                                                                                                      
    ["Skeletal Knight",                Creature, ["Undead", "Skeleton", "Soldier", "NONE"], 13, -1, Full, 0, 0, "Zone", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Defense, Nonliving, PsychicImmune, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                           [["Broadsword",        Quick, Melee,  0, 0, Typeless, 5, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], [[8, 1, Any, "NONE"], BlankDefense], SLOT, 1, 12, "Nonliving * Psychic Immunity.  "],                                                                                                      
    ["Skeletal Minion",                Creature, ["Undead", "Skeleton", "Soldier", "NONE"], 5,  -1, Full, 0, 0, "Zone", [1, [1, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Nonliving, PsychicImmune, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                           [["Femur",             Quick, Melee,  0, 0, Typeless, 3, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 0, 6,  "Nonliving * Psychic Immunity.  "],                                                                                                      
    ["Skeletal Sentry",                Creature, ["Undead", "Skeleton", "NONE", "NONE"],    8,  -1, Full, 0, 0, "Zone", [2, [2, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Nonliving, PsychicImmune, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                           [["Short Sword",       Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 0, 11, "Nonliving * Psychic Immunity.  "],                                                                                                      
    ["Unstable Fire Imp",              Creature, ["Demon", "NONE", "NONE", "NONE"],         5,  -1, Full, 0, 0, "Zone", [1, [1, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, ZoneAttack, Burn, Condition, Unavoidable, FlameMinusX, Destroy, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                         [["Flame Strike",      Quick, Melee,  0, 0, Typeless, 1, [9, "Burn"],    [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       ["Blazing Burst", NoAction, Zone, 0, 0, Flame, 0, [5, "Burn"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "Unavoidable, No Damage"],                                       BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 0, 4,  "Flame -3.  Unstable Fire Imp only makes the Blazing Burst attack if it is attacked and destroyed."],                                                                                                      
    ["Unstable Zombie",                Creature, ["Undead", "Zombie", "NONE", "NONE"],      9,  -1, Full, 0, 0, "Zone", [2, [2, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, BloodthirstyPlusX, Lumbering, Pest, Resilient, PsychicImmune, Nonliving, PiercingPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],          [["Talons",            Quick, Melee,  0, 0, Typeless, 3, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 0, 5,  "Bloodthirsty +1 * Lumbering * Pest * Resilient * Psychic Immunity * Nonliving.  When Unstable Zombie is activated, it may choose one of the following; Remove up to 2 damage from itself, its attack gains the Piering +2 trait until the end of the round, or it loses the Lumbering trait until end of its Action Phase."],                                                                                                      
    ["Venemous Zombie",                Creature, ["Undead", "Zombie", "NONE", "NONE"],      7,  -1, Full, 0, 0, "Zone", [2, [2, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Tainted, Condition, BloodthirstyPlusX, Lumbering, Pest, Resilient, PsychicImmune, Nonliving, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],              [["Venemous Bite",     Quick, Melee,  0, 0, Typeless, 2, [7, "Tainted"], [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 0, 5,  "Bloodthirsty +1 * Lumbering * Pest * Resilient * Psychic Immunity * Nonliving.  "],                                                                                                      
    ["Wildfire Imp",                   Creature, ["Demon", "NONE", "NONE", "NONE"],         5,  -1, Full, 0, 0, "Zone", [1, [1, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, PiercingPlusX, FlameMinusX, Teleport, Burn, Condition, MeleePlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                      [["Claws",             Quick, Melee,  0, 0, Typeless, 1, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +1"],                BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 0, 5,  "Flame -2.  Instead of taking a move action, Wildfire Imp may pay 1 mana to Teleport to a target zone with an object with a Burn condition on it. Wildfire Imp gains Melee +2 while attacking an object with a Burn condition on it."],                                                                                                      
    ["Zombie Brute",                   Creature, ["Undead", "Zombie", "NONE", "NONE"],      11, -1, Full, 0, 0, "Zone", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, BloodthirstyPlusX, Lumbering, Resilient, PsychicImmune, Nonliving, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],             [["Mangling Claws",    Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 0, 10, "Bloodthirsty +2 * Lumbering * Resilient * Psychic Immunity * Nonliving.  "],                                                                                                      
    ["Zombie Crawler",                 Creature, ["Undead", "Zombie", "NONE", "NONE"],      4,  -1, Full, 0, 0, "Zone", [1, [1, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, BloodthirstyPlusX, Slow, Pest, Resilient, PsychicImmune, Nonliving, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                     [["Bite",              Quick, Melee,  0, 0, Typeless, 2, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 0, 4,  "Bloodthirsty +1 * Slow * Pest * Resilient * Psychic Immunity * Nonliving.  "],                                                                                                      
    ["Zombie Minion",                  Creature, ["Undead", "Zombie", "NONE", "NONE"],      7,  -1, Full, 0, 0, "Zone", [2, [2, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, BloodthirstyPlusX, Lumbering, Pest, Resilient, PsychicImmune, Nonliving, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                [["Bite",              Quick, Melee,  0, 0, Typeless, 3, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"],                       BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack], BlankDefenses,                       SLOT, 0, 7,  "Bloodthirsty +1 * Lumbering * Pest * Resilient * Psychic Immunity * Nonliving.  "],                                                                                                      
    //["NAME", Creature, ["NONE", "NONE", "NONE", "NONE"], COST, -1, Full, 0, 0, "Zone", [-1, [0, SCHOOL, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD], ["NONE", ACTION, MELEERANGEDZONETRAMPLEANY, -1, -1, DamageType, -1, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"], BlankAttack,                                                                                                                                                              BlankAttack,                                                                                                                                                                                      BlankAttack, BlankDefenses,                       SLOT, -1, -1, ""]                                                                                                      

    //Earth Primary:

    //Fire Primary:

    //Holy Primary:

    //Mind Primary:

    //Nature Primary:

    //War Primary:

    //Water Primary:


    //Conjurations:
    //Air Primary:
    ["Fog Bank",           Conjuration, ["Cloud", "NONE", "NONE", "NONE"],        4,  -1, Quick, 0, 1, "Zone",            [1, [1, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [Wall, Incorporeal, Extendable, BlocksLOS, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                               [BlankAttack,                                                                                                                                           BlankAttack,                            BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, 4,  "Incorporeal * Extendable.  "],                                                                                                      
    ["Poison Gas Cloud",   Conjuration, ["Cloud", "Poison", "NONE", "NONE"],      8,  -1, Quick, 0, 1, "Zone",            [2, [2, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [Incorporeal, WindPlusX, DirectDamage, PoisonDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                     [BlankAttack,                                                                                                                                           BlankAttack,                            BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, 5,  "Incorporeal * Wind +2.  Each Upkeep Phase all Living creatures in Poison Gas Cloud's zone recieve 2 points of direct poison damage. If a Living creature enters this zone, or starts its Action Phase in this zone, it may not take more than one move action this round."],                                                                                                      
    ["Rolling Fog",        Conjuration, ["Cloud", "NONE", "NONE", "NONE"],        7,  -1, Quick, 0, 1, "Zone",            [2, [2, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [Indestructible, DissipateX, Incorporeal, Epic, Obscured, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                         [BlankAttack,                                                                                                                                           BlankAttack,                            BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "Indestructible * Dissipate 3 * Incorporeal * Epic.  All objects and zones in the arena have the Obscured trait."],                                                                                                      
    ["Raincloud",          Conjuration, ["Cloud", "Weather", "NONE", "NONE"],     8,  -1, Quick, 0, 1, "Zone",            [2, [1, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], [1, Water, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart], [MovingConjuration, Incorporeal, Flying, HydroImmune, FlameMinusX, AcidMinusX, RegenerateX, RemoveCondition, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD], [BlankAttack,                                                                                                                                           BlankAttack,                            BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, 5,  "Incorporeal * Flying * Hydro Immunity.  All objects in Raincloud's zone gain the Flame -2, Acid -2, and Regenerate 1 traits. Each Upkeep Phase you may remove 1 Burn or Corrode condition from 1 object in Raincloud's zone, by paying its removal cost. Once per round, immediately before any friendly Action Phase, you may pay 1 mana to move Raincloud 1 zone and attach it to that zone."],                                                                                                      
    ["Wall of Poison Gas", Conjuration, ["Cloud", "Poison", "NONE", "NONE"],      7,  -1, Quick, 0, 1, "Zone",            [2, [2, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [Wall, Incorporeal, WindPlusX, Extendable, BlocksLOS, PassageAttacks, PoisonDamage, Condition, Daze, Cripple, Unavoidable, CriticalDamage, KEYWORD, KEYWORD, KEYWORD],       [["Toxic Gas",         ACTION, Passage, 0, 0, Poison, 3, [5, "Daze"],   [10, "Cripple"],   [-1, "NONE"], [-1, "NONE"], "Unavoidable, Critical Damage"], BlankAttack,                            BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, 8,  "Incorporeal * Wind +2 * Extendable.  "],                                                                                                      

    //Arcane Primary:
    ["NAMEGOESHERE",          Conjuration, ["TYPEHERE", "NONE", "NONE", "NONE"],        99,  -1, Quick, 0, 1, "Zone",            [2, [2, Arcane, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                  [BlankAttack,                                                                                                                                           BlankAttack,                            BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      

    //Dark Primary:
    ["NAMEGOESHERE",          Conjuration, ["TYPEHERE", "NONE", "NONE", "NONE"],        99,  -1, Quick, 0, 1, "Zone",            [2, [2, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                  [BlankAttack,                                                                                                                                           BlankAttack,                            BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      

    //Earth Primary:
    ["NAMEGOESHERE",          Conjuration, ["TYPEHERE", "NONE", "NONE", "NONE"],        99,  -1, Quick, 0, 1, "Zone",            [2, [2, Earth, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                  [BlankAttack,                                                                                                                                           BlankAttack,                            BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      

    //Fire Primary:
    ["NAMEGOESHERE",          Conjuration, ["TYPEHERE", "NONE", "NONE", "NONE"],        99,  -1, Quick, 0, 1, "Zone",            [2, [2, Fire, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                  [BlankAttack,                                                                                                                                           BlankAttack,                            BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      

    //Holy Primary:
    ["NAMEGOESHERE",          Conjuration, ["TYPEHERE", "NONE", "NONE", "NONE"],        99,  -1, Quick, 0, 1, "Zone",            [2, [2, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                  [BlankAttack,                                                                                                                                           BlankAttack,                            BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      

    //Mind Primary:
    ["NAMEGOESHERE",          Conjuration, ["TYPEHERE", "NONE", "NONE", "NONE"],        99,  -1, Quick, 0, 1, "Zone",            [2, [2, Mind, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                  [BlankAttack,                                                                                                                                           BlankAttack,                            BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      

    //Nature Primary:
    ["NAMEGOESHERE",          Conjuration, ["TYPEHERE", "NONE", "NONE", "NONE"],        99,  -1, Quick, 0, 1, "Zone",            [2, [2, Nature, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                  [BlankAttack,                                                                                                                                           BlankAttack,                            BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      

    //War Primary:
    ["NAMEGOESHERE",          Conjuration, ["TYPEHERE", "NONE", "NONE", "NONE"],        99,  -1, Quick, 0, 1, "Zone",            [2, [2, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                  [BlankAttack,                                                                                                                                           BlankAttack,                            BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      

    //Water Primary:
    ["NAMEGOESHERE",          Conjuration, ["TYPEHERE", "NONE", "NONE", "NONE"],        99,  -1, Quick, 0, 1, "Zone",            [2, [2, Water, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                  [BlankAttack,                                                                                                                                           BlankAttack,                            BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, -1, "NONE"],                                                                                                      


    //Enchantments:
    //Air Primary:

    //Arcane Primary:

    //Dark Primary:

    //Earth Primary:

    //Fire Primary:

    //Holy Primary:

    //Mind Primary:

    //Nature Primary:

    //War Primary:

    //Water Primary:


    //Equipment:
    //Amulets:
    ["Adramelech's Torment",       Equipment, BlankSubtype,                            3,  -1, Quick, 0, 2, "Mage", [1, [1, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [WarlockOnly, Burn, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                                BlankAttacks,                                                                                                                                                                                    BlankDefenses, Amulet, -1, -1, "Warlock Only.  At the end of this Mage's Action Phase, they may pay 2 mana to place a Burn condition on target creature. That creature must have no Burn conditions, and at least one revealed Curse you control attached to it."],
    ["Meditation Amulet",          Equipment, ["Mana", "NONE", "NONE", "NONE"],        4,  -1, Quick, 0, 2, "Mage", [1, [1, Mind, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                                 [["Meditate", Full, NonAttackMelee,  0, 0, NoDamage, -1, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Add 3 mana to your mana supply."], BlankAttack, BlankAttack, BlankAttack], BlankDefenses, Amulet, -1, -1, "NONE"],
    ["Moloch's Torment",           Equipment, BlankSubtype,                            3,  -1, Quick, 0, 2, "Mage", [1, [1, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [DirectDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                            BlankAttacks,                                                                                                                                                                                    BlankDefenses, Amulet, -1, -1, "Warlock Only.  During the Upkeep Phase, for each creature that has at least one curse you control attached to it, you may spend 1 mana to deal 1 direct damage to that creature."],
    ["Moonglow Amulet",            Equipment, BlankSubtype,                            6,  -1, Quick, 0, 2, "Mage", [1, [1, Arcane, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [ChannelingPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                         BlankAttacks,                                                                                                                                                                                    BlankDefenses, Amulet, -1, -1, "Mage gains the Channel +1 trait."],
    ["Sunfire Amulet",             Equipment, ["Healing", "NONE", "NONE", "NONE"],     6,  -1, Quick, 0, 2, "Mage", [2, [1, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], [1, Nature, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart], [LifePlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                               BlankAttacks,                                                                                                                                                                                    BlankDefenses, Amulet, -1, -1, "Each Upkeep Phase, Mage gains 1 Life."],

    //Belts:
    ["Colossus Belt",              Equipment, BlankSubtype,                            5,  -1, Quick, 0, 2, "Mage", [1, [1, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [ToughMinusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                             BlankAttacks,                                                                                                                                                                                    BlankDefenses, Belt, -1, -1, "Mage gains the Tough -2 trait."],
    ["Regrowth Belt",              Equipment, BlankSubtype,                            6,  -1, Quick, 0, 2, "Mage", [1, [1, Nature, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RegenerateX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                             BlankAttacks,                                                                                                                                                                                    BlankDefenses, Belt, -1, -1, "Mage gains the Regenerate 2 trait."],
    ["Veteran's Belt",             Equipment, BlankSubtype,                            4,  -1, Quick, 0, 2, "Mage", [1, [1, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [CriticalDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                          BlankAttacks,                                                                                                                                                                                    BlankDefenses, Belt, -1, -1, "Whenever this Mage is attacked, at the end of the Roll Dice Step, he may convert up to 2 critical damage to normal damage."],

    //Boots:
    ["Eagleclaw Boots",            Equipment, BlankSubtype,                            4,  -1, Quick, 0, 2, "Mage", [1, [1, Nature, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [Climbing, Unmovable, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                              BlankAttacks,                                                                                                                                                                                    BlankDefenses, Boots, -1, -1, "Mage gains the Unmovable and Climbing traits."],
    ["Leather Boots",              Equipment, BlankSubtype,                            2,  -1, Quick, 0, 2, "Mage", [1, [1, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [ArmorPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                              BlankAttacks,                                                                                                                                                                                    BlankDefenses, Boots, -1, -1, "Novice.  Mage gains Armor +1."],
    ["Reflex Boots",               Equipment, ["Defense", "NONE", "NONE", "NONE"],     9,  -1, Quick, 0, 2, "Mage", [2, [2, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [Defense, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                                 BlankAttacks,                                                                                                                                                                                    [[7, 1, Any, "NONE"], BlankDefense], Boots, -1, -1, "Mage gains a Defense."],
    ["Steadfast Boots",            Equipment, ["Boots", "NONE", "NONE", "NONE"],       5,  -1, Quick, 0, 2, "Mage", [1, [1, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [WarMageOnly, Anchored, Unmovable, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                          BlankAttacks,                                                                                                                                                                                    BlankDefenses, Boots, -1, -1, "War Mage Only.  This Mage gains the Unmovable and Anchored traits."],

    //Chest Pieces:
    ["Bearskin",                   Equipment, BlankSubtype,                            6,  -1, Quick, 0, 2, "Mage", [1, [1, Nature, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [ArmorPlusX, FrostMinusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                          BlankAttacks,                                                                                                                                                                                    BlankDefenses, ChestPiece, -1, -1, "Mage gains Armor +2 and the Frost -2 trait."],
    ["Chitin Armor",               Equipment, ["Armor", "NONE", "NONE", "NONE"],       6,  -1, Quick, 0, 2, "Mage", [1, [1, Nature, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [ArmorPlusX, AcidMinusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                           BlankAttacks,                                                                                                                                                                                    BlankDefenses, ChestPiece, -1, -1, "Mage gains Armor +2 and the Acid -3 trait."],
    ["Demonhide Armor",            Equipment, BlankSubtype,                            8,  -1, Quick, 0, 2, "Mage", [2, [2, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [DarkMageOnly, ArmorPlusX, DamageBarrierAttack, Ethereal, Unavoidable, CriticalDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD], [["Demonic Presence", NoAction, DamageBarrier,  0, 0, Typeless, 1, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Ethereal, Unavoidable, Critical Damage"], BlankAttack, BlankAttack, BlankAttack], BlankDefenses, ChestPiece, -1, -1, "Dark Mage Only.  Mage gains Armor +2 and a Damage Barrier."],
    ["Dragonscale Hauberk",        Equipment, BlankSubtype,                            6,  -1, Quick, 0, 2, "Mage", [1, [1, Fire, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [ArmorPlusX, FlameMinusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                          BlankAttacks,                                                                                                                                                                                    BlankDefenses, ChestPiece, -1, -1, "Mage gains Armor +2 and the Flame -2 trait."],
    ["Harshforge Plate",           Equipment, BlankSubtype,                            8,  -1, Quick, 0, 2, "Mage", [2, [2, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [WarMageOnly, ArmorPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                          BlankAttacks,                                                                                                                                                                                    BlankDefenses, ChestPiece, -1, -1, "War Mage Only.  Mage gains Armor +2. Enemy controlled enchantments and incantations, which target this Mage, cost 2 additional mana to cast."],
    ["Leviathan Scale Armor",      Equipment, ["Armor", "NONE", "NONE", "NONE"],       6,  -1, Quick, 0, 2, "Mage", [1, [1, Water, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [ArmorPlusX, HydroMinusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                          BlankAttacks,                                                                                                                                                                                    BlankDefenses, ChestPiece, -1, -1, "Mage gains Armor +2 and the Hydro -2 trait."],
    ["Radiant Breastplate",        Equipment, ["Armor", "NONE", "NONE", "NONE"],       6,  -1, Quick, 0, 2, "Mage", [2, [2, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [HolyMageOnly, ArmorPlusX, Guard, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                           BlankAttacks,                                                                                                                                                                                    BlankDefenses, ChestPiece, -1, -1, "Holy Mage Only.  Mage gains Armor +2. At the end of this Mage's Action Phase, he or she may pay 2 mana to gain a Guard Marker."],
    ["Storm Drake Hide",           Equipment, BlankSubtype,                            6,  -1, Quick, 0, 2, "Mage", [1, [1, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [ArmorPlusX, LightningMinusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                      BlankAttacks,                                                                                                                                                                                    BlankDefenses, ChestPiece, -1, -1, "Mage gains Armor +2 and the Lightning -2 trait."],
    ["Wind Wyvern Hide",           Equipment, BlankSubtype,                            6,  -1, Quick, 0, 2, "Mage", [1, [1, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [ArmorPlusX, WindMinusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                           BlankAttacks,                                                                                                                                                                                    BlankDefenses, ChestPiece, -1, -1, "Mage gains Armor +2 and the Wind -2 trait."],

    //Cloaks:
    ["Cloak of Shadows",           Equipment, ["Shadow", "NONE", "NONE", "NONE"],      6,  -1, Quick, 0, 2, "Mage", [2, [2, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [DarkMageOnly, Obscured, LightMinusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                       BlankAttacks,                                                                                                                                                                                    BlankDefenses, Cloak, -1, -1, "Dark Mage Only.  Mage gains the Obscured and Light -2 traits."],
    ["Elemental Cloak",            Equipment, BlankSubtype,                            6,  -1, Quick, 0, 2, "Mage", [1, [1, Arcane, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [ArmorPlusX, FlameMinusX, FrostMinusX, LightningMinusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],              BlankAttacks,                                                                                                                                                                                    BlankDefenses, Cloak, -1, -1, "Mage gains Armor +1, and the Flame -2, Frost -2, and Lightning -2 traits."],
    ["Paladin's Cloak",            Equipment, ["Cloak", "NONE", "NONE", "NONE"],       3,  -1, Quick, 0, 2, "Mage", [1, [1, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [PaladinOnly, Heal, Valor, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                                  BlankAttacks,                                                                                                                                                                                    BlankDefenses, Cloak, -1, -1, "Paladin Only.  When your Mage casts a healing incantation, heal this Mage 1 damage. When a healing incantation cast by your Mage heals 4 or more damage from a friendly non-Mage creature, gain 1 Valor."],
    ["Suppression Cloak",          Equipment, ["Mana", "NONE", "NONE", "NONE"],        8,  -1, Quick, 0, 2, "Mage", [2, [2, Arcane, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [WizardOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                              BlankAttacks,                                                                                                                                                                                    BlankDefenses, Cloak, -1, -1, "Wizard Only.  The first time each round that each creature makes a melee attack against this Mage, its controller must pay 2 Mana during the Declare Attack Step, as an additional cost of making that attack. Has no effect on counterstrikes."],
    ["Waterfall Cloak",            Equipment, ["Cloak", "Hydro", "NONE", "NONE"],      3,  -1, Quick, 0, 2, "Mage", [1, [1, Water, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [AcidMinusX, Burn, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                                 BlankAttacks,                                                                                                                                                                                    BlankDefenses, Cloak, -1, -1, "This Mage gains the Acid -2 trait. During the Upkeep Phase, you may remove one Burn condition by paying 1 mana."],

    //Gloves:
    ["Champion's Gauntlets",       Equipment, ["Gloves", "NONE", "NONE", "NONE"],      2,  -1, Quick, 0, 2, "Mage", [1, [1, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [WarMageOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                             BlankAttacks,                                                                                                                                                                                    BlankDefenses, Gloves, -1, -1, "War Mage Only.  Equipment objects in this Mage's Weapon, Ring, and Shield locations cannot be destroyed by an opponent's effects. When Champion's Gauntlets would be destroyed by an opponent's effect, prevent that destruction unless that opponent pays 2 mana."],
    ["Deflection Bracers",         Equipment, ["Defense", "NONE", "NONE", "NONE"],     6,  -1, Quick, 0, 2, "Mage", [1, [1, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [Defense, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                                 BlankAttacks,                                                                                                                                                                                    [[7, 1, Melee, "NONE"], BlankDefense], Gloves, -1, -1, "Mage gains a Defense."],
    ["Gauntlets of Strength",      Equipment, BlankSubtype,                            3,  -1, Quick, 0, 2, "Mage", [1, [1, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [MeleePlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                              BlankAttacks,                                                                                                                                                                                    BlankDefenses, Gloves, -1, -1, "Mage gains the Melee +1 trait."],
    ["Gloves of Skill",            Equipment, ["Gloves", "NONE", "NONE", "NONE"],      3,  -1, Quick, 0, 2, "Mage", [1, [1, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [RangedAttack, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                            BlankAttacks,                                                                                                                                                                                    BlankDefenses, Gloves, -1, -1, "Once per round, this Mage may re-roll all of the attack dice (but not the effect die) of one ranged attack they make (including attack spells). If the attack action makes multiple attacks (such as a zone attack), this Mage must choose just one attack to re-roll."],
    ["Leather Gloves",             Equipment, BlankSubtype,                            2,  -1, Quick, 0, 2, "Mage", [1, [1, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [Novice, ArmorPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                               BlankAttacks,                                                                                                                                                                                    BlankDefenses, Gloves, -1, -1, "Novice.  Mage gains Armor +1."],

    //Helmets:
    ["Bloodfire Helmet",           Equipment, BlankSubtype,                            5,  -1, Quick, 0, 2, "Mage", [1, [1, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [WarlockOnly, MeleePlusX, Burn, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                             BlankAttacks,                                                                                                                                                                                    BlankDefenses, Helmet, -1, -1, "Warlock Only.  Demons you control gain Melee +1 while attacking an object with a Burn condition."],
    ["Crown of Protection",        Equipment, ["Protection", "NONE", "NONE", "NONE"],  1,  -1, Quick, 0, 2, "Mage", [1, [1, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [PriestessOnly, ArmorPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                        BlankAttacks,                                                                                                                                                                                    BlankDefenses, Helmet, -1, -1, "Priestess Only.  Once per round, as a quick spell, this Mage may pay 2 mana to place an Armor +1 token on a target living non-Mage creature up to one zone away. These tokens may stack."],
    ["Helm of Command",            Equipment, BlankSubtype,                            4,  -1, Quick, 0, 2, "Mage", [2, [2, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [WarlordOnly, Spellbind, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                           BlankAttacks,                                                                                                                                                                                    BlankDefenses, Helmet, -1, -1, "Spellbind * Warlord Only.  You may bind a non-Epic command incantation spell from your spellbook to Helm of Command. As a quick spell, you may pay 1 mana to change the bound spell."],
    ["Helm of Fear",               Equipment, BlankSubtype,                            8,  -1, Quick, 0, 2, "Mage", [2, [2, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [WarlockOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                             BlankAttacks,                                                                                                                                                                                    BlankDefenses, Helmet, -1, -1, "Warlock Only.  Whenever this mage is targeted by a melee attack (except a Counterstrike), at the beginning of the Declare Attack Step, roll the effect die. On a 9+ the attack is cancelled. The attacker may choose to attack a different target instead. This does not affect creatures with the Nonliving or Psychic Immunity traits."],
    ["Helm of Justice",            Equipment, ["Retribution", "Helm", "NONE", "NONE"], 2,  -1, Quick, 0, 2, "Mage", [1, [1, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [HolyMageOnly, DirectDamage, LightDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                   BlankAttacks,                                                                                                                                                                                    BlankDefenses, Helmet, -1, -1, "Holy Mage Only.  When a non-Mage friendly creature in your zone is attacked and damaged, you may pay 1 mana. If you do, the attacker recieves 1 direct light damage, regardless of range or LoS."],
    ["Psi-Orb",                    Equipment, ["Mana", "NONE", "NONE", "NONE"],        7,  -1, Quick, 0, 2, "Mage", [2, [2, Mind, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [MindMageOnly, Upkeep, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                             BlankAttacks,                                                                                                                                                                                    BlankDefenses, Helmet, -1, -1, "Mind Mage Only.  Each Upkeep Phase, you may pay 1 less upkeep for up to 3 different Mind spells you control."],

    //Rings:
    ["Arcane Ring",                Equipment, ["Mana", "NONE", "NONE", "NONE"],        2,  -1, Quick, 0, 2, "Mage", [1, [1, Arcane, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [WizardOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                              BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Wizard Only.  Once per round, this Mage may pay 1 less mana when he casts or reveals a metamagic or mana spell. Enchantments only receive this discount when they are revealed."],
    ["Dawnbreaker Ring",           Equipment, BlankSubtype,                            3,  -1, Quick, 0, 2, "Mage", [1, [1, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [MeleePlusX, RangedPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                          BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Mage gains the Melee +1 and Ranged +1 traits for all attacks he makes that deal light damage."],
    ["Death Ring",                 Equipment, ["Necro", "Mana", "NONE", "NONE"],       5,  -1, Quick, 0, 2, "Mage", [1, [1, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [NecromancerOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                         BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Necromancer Only.  Up to twice per round, this Mage may pay 1 less mana when he, or a spawnpoint he controls, casts or reveals a necro or undead spell. Enchantments only recieve this discount when they are revealed."],
    ["Defense Ring",               Equipment, BlankSubtype,                            3,  -1, Quick, 0, 2, "Mage", [1, [1, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [Defense, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                                 BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Mage may add +1 to the d12 roll each time he uses a Defense to avoid an attack."],
    ["Druid's Leaf Ring",          Equipment, ["Mana", "NONE", "NONE", "NONE"],        2,  -1, Quick, 0, 2, "Mage", [1, [1, Nature, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [DruidOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                               BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Druid Only.  Once per round, this Mage may pay 1 less mana when she casts or reveals a plant spell. Enchantments onlr receive this discount when they are revealed."],
    ["Enchanter's Ring",           Equipment, BlankSubtype,                            2,  -1, Quick, 0, 2, "Mage", [1, [1, Arcane, Nature, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                                 BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Once per round, this Mage may pay 1 less mana when he casts an enchantment spell that targets a friendly creature."],
    ["Fireshaper Ring",            Equipment, BlankSubtype,                            3,  -1, Quick, 0, 2, "Mage", [1, [1, Fire, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [MeleePlusX, RangedPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                          BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Mage gains the Melee +1 and Ranged +1 traits for all attacks he makes that deal flame damage."],
    ["Force Ring",                 Equipment, ["Mana", "Force", "NONE", "NONE"],       3,  -1, Quick, 0, 2, "Mage", [1, [1, Mind, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [ForcemasterOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                         BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Forcemaster Only.  Once per round, this Mage may pay 1 less mana when she casts or reveals a force spell. Enchantments only receive this discount when they are revealed."],
    ["Gale Force Ring",            Equipment, BlankSubtype,                            3,  -1, Quick, 0, 2, "Mage", [1, [1, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                                 BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Mage adds +2 to the effect die roll for all attacks he makes that deal wind damage. If he makes multiple attacks in the same round, all of them receive this bonus."],
    ["General's Signet Ring",      Equipment, ["Mana", "NONE", "NONE", "NONE"],        3,  -1, Quick, 0, 2, "Mage", [1, [1, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [WarlordOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                             BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Warlord Only.  Once per round, this Mage may pay 1 less mana when he, or a Spawnpoint he controls, casts a soldier spell."],
    ["Lightning Ring",             Equipment, BlankSubtype,                            3,  -1, Quick, 0, 2, "Mage", [1, [1, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [MeleePlusX, RangedPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                          BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "age gains the Melee +1 and Ranged +1 traits for all attacks he makes that deal lightning damage."],
    ["Mohktari's Branch",          Equipment, ["Healing", "NONE", "NONE", "NONE"],     4,  -1, Quick, 0, 2, "Mage", [1, [1, Nature, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RangedAction, Condition, Heal, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                             [["Mohktari's Touch", Quick, NonAttackRanged, 0, 1, NoDamage, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "XCOST Remove 1 condition marker from target plant object (pay its removal cost). If you do, you may heal it 1 damage."], BlankAttack, BlankAttack, BlankAttack], BlankDefenses, Ring, -1, -1, "Once per round, this Mage may cast the above quick spell."],
    ["Ring of Asyra",              Equipment, ["Mana", "NONE", "NONE", "NONE"],        2,  -1, Quick, 0, 2, "Mage", [1, [1, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [PriestessOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                           BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Priestess Only.  Once per round, this Mage may pay 1 less mana when she casts or reveals a Holy enchantment or incantation spell. Enchantments only receive this discount when they are revealed."],
    ["Ring of Command",            Equipment, ["Mana", "NONE", "NONE", "NONE"],        3,  -1, Quick, 0, 2, "Mage", [1, [1, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [WarlordOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                             BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Warlord Only.  Once per round, this Mage may pay 1 less mana when he casts or reveals a command spell. Enchantments only receive this discount when they are revealed."],
    ["Ring of Curses",             Equipment, ["Mana", "NONE", "NONE", "NONE"],        2,  -1, Quick, 0, 2, "Mage", [1, [1, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [WarlockOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                             BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Warlock Only.  Once per round, this Mage may pay 1 less mana when he casts or reveals a curse spell. Enchantments only receive this discount when they are revealed."],
    ["Ring of Tides",              Equipment, ["Ring", "NONE", "NONE", "NONE"],        3,  -1, Quick, 0, 2, "Mage", [1, [1, Water, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [SirenOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                               BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Siren Only.  While you have the Initiative, when this Mage makes a hydro attack, that attack rolls 1 additional attack die and adds +2 to the effect roll."],
    ["Ring of the Ocean's Depths", Equipment, ["Mana", "Ring", "NONE", "NONE"],        2,  -1, Quick, 0, 2, "Mage", [1, [1, Water, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [WaterMageOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                           BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Water Mage Only.  Once per round, this Mage may pay 1 less mana when he or she casts or reveals a hydro or aquatic spell. Enchantments only receive this discount when they are revealed."],
    ["Signet of the Dawnbreaker",  Equipment, ["Mana", "Ring", "NONE", "NONE"],        3,  -1, Quick, 0, 2, "Mage", [1, [1, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [PaladinOnly, Challenge, Valor, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                             BlankAttacks,                                                                                                                                                                                    BlankDefenses, Ring, -1, -1, "Paladin Only.  When you attack and destroy your Challenged enemy, gain Valor equal to its level. Once per round, when you attack your Challenged enemy, gain 1 mana."],

    //Shields:
    ["Dawn's Bastion",             Equipment, ["Defense", "Shield", "NONE", "NONE"],   9,  -1, Quick, 0, 2, "Mage", [2, [2, Light, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [PaladinOnly, Defense, Intercept, Valor, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                             BlankAttacks,                                                                                                                                                                                    [[7, 1, Any, "NONE"], BlankDefense], Shield, -1, -1, "Paladin Only.  This Mage gains a Defense and the Intercept trait. When this Mage intercepts an enemy attack, gain 1 Valor."],
    ["Spiked Buckler",             Equipment, ["Shield", "Defense", "NONE", "NONE"],   8,  -1, Quick, 0, 2, "Mage", [2, [2, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [Defense, MeleeAttack, Counterstrike, PiercingPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                 [["Shield Bash", Quick, Melee,  0, 0, Typeless, 3, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +1"], BlankAttack, BlankAttack, BlankAttack],                           [[8, 1, Melee, "NONE"], BlankDefense], Shield, -1, -1, "Mage gains a Defense. Whenever this Defense successfully avoids an attack, Spiked Buckler's attack gains the Counterstrike trait until the end of that attack sequence."],

    //Weapons:
    ["Deathshroud Staff",          Equipment, ["Necro", "NONE", "NONE", "NONE"],       8,  -1, Quick, 0, 2, "Mage", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [MeleeAttack, NecromancerOnly, Rot, MeleePlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                      [["Deathshroud Strike", Quick, Melee,  0, 0, Typeless, 4, [8, "Rot"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"], BlankAttack, BlankAttack, BlankAttack],                             BlankDefenses, WeaponAndShield, -1, -1, "Necromancer Only.  Once per round, as a quick necro spell, you may pay 2 mana to target a zone up to 1 zone away. All friendly undead creatures in that zone gain Melee +1 until the end of the round."],
    ["Eisenach's Forge Hammer",    Equipment, ["Mana", "NONE", "NONE", "NONE"],        8,  -1, Quick, 0, 2, "Mage", [2, [2, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [MeleeAttack, WarMageOnly, Daze, Stun, Spawnpoint, Familiar, Equipment, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                         [["Smash", Quick, Melee,  0, 0, Typeless, 4, [8, "Daze"],   [11, "Stun"],   [-1, "NONE"], [-1, "NONE"], "NONE"], BlankAttack, BlankAttack, BlankAttack],                                         BlankDefenses, WeaponAndShield, -1, -1, "War Mage Only.  Once per round, this Mage may pay 1 less mana when he, or a Spawnpoint or Familiar he controls, casts an equipment spell."],
    ["Galvitar, Force Blade",      Equipment, ["Force", "NONE", "NONE", "NONE"],       11, -1, Quick, 0, 2, "Mage", [3, [3, Mind, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [MeleeAttack, ForcemasterOnly, Ethereal, PiercingPlusX, Sweeping, Doublestrike, Cantrip, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],        [["Thrust", Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Ethereal, Piercing +2"], ["Spinning Slash", Full, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Ethereal, Sweeping OR Doublestrike"], BlankAttack, BlankAttack], BlankDefenses, WeaponAndShield, -1, -1, "Cantrip * Forcemaster Only.  "],
    ["Hunting Spear",              Equipment, ["Weapon", "Spear", "NONE", "NONE"],     5,  -1, Quick, 0, 2, "Mage", [2, [2, Nature, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, RangedAttack, BeastmasterOnly, PiercingPlusX, Cripple, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],          [["Crippling Throw", Quick, Ranged,  1, 2, Typeless, 4, [7, "Cripple"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +2"], ["Debilitating Lunge", Quick, Melee,  0, 0, Typeless, 3, [10, "Cripple"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +2"], BlankAttack, BlankAttack], BlankDefenses, WeaponAndShield, -1, -1, "Beastmaster Only.  After making the Crippling Throw attack, return this to the owner's spellbook unless you pay 5 mana."],
    ["Lash of Hellfire",           Equipment, BlankSubtype,                            8,  -1, Quick, 0, 2, "Mage", [2, [1, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], [1, Fire, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart],   [MeleeAttack, WarlockOnly, FlameDamage, Burn, Reach, Defrost, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                          [["Searing Thrash", Quick, Melee,  0, 0, Flame, 4, [7, "Burn"],   [11, "2 Burn"],   [-1, "NONE"], [-1, "NONE"], "Reach, Defrost"], BlankAttack, BlankAttack, BlankAttack],                       BlankDefenses, WeaponAndShield, -1, -1, "Warlock Only.  "],
    ["Mage Staff",                 Equipment, BlankSubtype,                            5,  -1, Quick, 0, 2, "Mage", [1, [1, Arcane, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, Reach, Ethereal, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                              [["Arcane Burst", Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Reach, Ethereal"], BlankAttack, BlankAttack, BlankAttack],                      BlankDefenses, WeaponAndShield, -1, -1, "NONE"],
    ["Morning Star",               Equipment, BlankSubtype,                            5,  -1, Quick, 0, 2, "Mage", [1, [1, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [MeleeAttack, Unavoidable, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                         [["Overhead Bash", Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Unavoidable"], BlankAttack, BlankAttack, BlankAttack],                         BlankDefenses, WeaponAndShield, -1, -1, "NONE"],
    ["Sectarus, Dark Rune Sword",  Equipment, ["Curse", "NONE", "NONE", "NONE"],       10, -1, Quick, 0, 2, "Mage", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [MeleeAttack, DarkMageOnly, PiercingPlusX, Familiar, Channeling, Legendary, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],            [["Cursed Edge", Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +1"], BlankAttack, BlankAttack, BlankAttack],                           BlankDefenses, WeaponAndShield, -1, -1, "Channeling 1 * Familiar * Legendary * Dark Mage Only.  Sectarus is a non-creature familiar, which can be used to cast only curse enchantments. If Sectarus is used to attack and damage a creature, it may immediately cast the spell on that creature as a free action."],
    ["Shoalsdeep Trident",         Equipment, ["Spear", "Weapon", "NONE", "NONE"],     8,  -1, Quick, 0, 2, "Mage", [2, [2, Water, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [MeleeAttack, RangedAttack, SirenOnly, PiercingPlusX, Extinguish, Push, HydroDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],            [["Spearpoint Thrust", Quick, Melee,  0, 0, Typeless, 4, [5, "Push"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +2"], ["Wave Blast", Full, Ranged,  0, 1, Hydro, 3, [5, "Push"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Extinguish"], BlankAttack, BlankAttack], BlankDefenses, WeaponAndShield, -1, -1, "Siren Only.  "],
    ["Staff of Asyra",             Equipment, BlankSubtype,                            9,  -1, Quick, 0, 2, "Mage", [2, [2, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [MeleeAttack, PriestessOnly, Ethereal, Daze, Stun, LightDamage, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                        [["Celestial Strike", Quick, Melee,  0, 0, Light, 4, [5, "Daze"],   [11, "Stun"],   [-1, "NONE"], [-1, "NONE"], "Ethereal, +2 vs. Nonliving Creatures"], BlankAttack, BlankAttack, BlankAttack], BlankDefenses, WeaponAndShield, -1, -1, "Priestess Only.  "],
    ["Staff of the Arcanum",       Equipment, BlankSubtype,                            8,  -1, Quick, 0, 2, "Mage", [2, [2, Arcane, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, RangedAttack, Ethereal, ManaDrain, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                     [["Arcane Strike", Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Ethereal, Mana Drain 1"], ["Arcane Blast", Full, Ranged,  1, 1, Typeless, 3, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Ethereal, Mana Drain 1"], BlankAttack, BlankAttack], BlankDefenses, WeaponAndShield, -1, -1, "NONE"],
    ["Sword of Radiance",          Equipment, ["Sword", "Weapon", "NONE", "NONE"],     8,  -1, Quick, 0, 2, "Mage", [2, [2, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [MeleeAttack, PaladinOnly, Ethereal, Daze, Burn, LightDamage, Valor, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                            [["Radiant Slash", Quick, Melee,  0, 0, Light, 4, [10, "Daze"],   [13, "Burn"],   [-1, "NONE"], [-1, "NONE"], "Ethereal, +2 vs. Nonliving Creatures"], BlankAttack, BlankAttack, BlankAttack],   BlankDefenses, WeaponAndShield, -1, -1, "Paladin Only.  When you declare an attack with Radiant Slash, you may spend a Valor to add +6 to your effect roll. When the Radiant Slash attack deals 5 or more damage, gain 1 Valor."],
    ["Vinewhip Staff",             Equipment, ["Vine", "NONE", "NONE", "NONE"],        7,  -1, Quick, 0, 2, "Mage", [2, [2, Nature, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [MeleeAttack, DruidOnly, Reach, VineMarker, Stuck, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                            [["Vinelash", Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Reach"], BlankAttack, BlankAttack, BlankAttack],                                    BlankDefenses, WeaponAndShield, -1, -1, "Druid Only.  As a quick spell, you may pay 1 mana to place a Vine marker in a target zone up to 1 zone away. Once per round, as a quick spell, you may pay 4 mana and destroy a target friendly Vine marker up to 2 zones away, to give a target non-flying creature in that zone the Stuck condition."],
    ["Vorpal Blade",               Equipment, ["Weapon", "Sword", "NONE", "NONE"],     5,  -1, Quick, 0, 2, "Mage", [1, [1, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [MeleeAttack, PiercingPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                       [["Razor Edged Slash", Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +2"], BlankAttack, BlankAttack, BlankAttack],                     BlankDefenses, WeaponAndShield, -1, -1, "NONE"],

    //Weapon Or Shields:
    ["Dispel Wand",                Equipment, ["Metamagic", "NONE", "NONE", "NONE"],   4,  -1, Quick, 0, 2, "Mage", [2, [2, Arcane, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RangedAction, Destroy, Enchantment, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                        [["Disenchant", Quick, NonAttackRanged,  0, 1, NoDamage, -1, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "XCOST Destroy target Level 1 revealed enchantment."], ["Mage Sight", Quick, NonAttackRanged,  0, 2, NoDamage, -1, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "0COST Look at target hidden enchantment. Then leave it face down after looking."], BlankAttack, BlankAttack],            BlankDefenses, WeaponOrShield, -1, -1, "Dispel Wand's abilities can each be used once per round as a quick spell. X = target's casting cost and reveal cost."],
    ["Echo of the Depths",         Equipment, ["Horn", "Instrument", "NONE", "NONE"],  12, -1, Quick, 0, 2, "Mage", [3, [3, Water, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [SirenOnly, Spawnpoint, Epic, Channeling, ChannelingPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                    BlankAttacks,                                                                                                                                                                                                                                                                                                                                                                                                                     BlankDefenses, WeaponOrShield, -1, -1, "Channeling 1 * Spawnpoint * Siren Only * Epic.  While you control a song enchantment, Echo of the Depths gains Channeling +1. During the Deployment Phase, it may Summon 1 Water creature. If Echo of the Depths would be destroyed by an opponent's spell or effect, prevent that destruction, unless your opponent pays 2 mana for each song enchantment you control."],
    ["Elemental Wand",             Equipment, BlankSubtype,                            5,  -1, Quick, 0, 2, "Mage", [2, [2, Earth, Fire, Air, Water, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                                   [Spellbind, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                               BlankAttacks,                                                                                                                                                                                                                                                                                                                                                                                                                     BlankDefenses, WeaponOrShield, -1, -1, "Spellbind.  You may bind a non-Epic attack spell from your spellbook to Elemental Wand. As a quick spell, you may pay 3 mana to change the bound spell."],
    ["Horn of Gothos",             Equipment, BlankSubtype,                            3,  -1, Quick, 0, 2, "Mage", [2, [2, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [WarlordOnly, Legendary, BattleOrders, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                      BlankAttacks,                                                                                                                                                                                                                                                                                                                                                                                                                     BlankDefenses, WeaponOrShield, -1, -1, "Legendary * Warlord Only.  Whenever the Warlord uses his Battle Orders ability, he may pay an additional 3 mana during the Cast Spell Step to extend the spell's range so that it affects all friendly soldiers in the arena."],
    ["Libro Mortuos",              Equipment, ["Necro", "Tome", "NONE", "NONE"],       10, -1, Quick, 0, 2, "Mage", [3, [3, Dark, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [NecromancerOnly, Spawnpoint, Epic, Channeling, Life, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                         BlankAttacks,                                                                                                                                                                                                                                                                                                                                                                                                                     BlankDefenses, WeaponOrShield, -1, -1, "Channeling 1 * Spawnpoint * Necromancer Only * Epic.  During the Deployment Phase, Libro Mortuos may summon one undead creature into your zone. If Libro Mortuos is destroyed, you may lose 3 Life to return it to your spellbook instead of the discard pile."],
    ["Mage Wand",                  Equipment, BlankSubtype,                            5,  -1, Quick, 0, 2, "Mage", [2, [2, Arcane, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [Spellbind, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                               BlankAttacks,                                                                                                                                                                                                                                                                                                                                                                                                                     BlankDefenses, WeaponOrShield, -1, -1, "Spellbind.  You may bind a non-Epic incantation spell from your spellbook to Mage Wand. As a quick spell, you may pay 3 mana to change the bound spell."],
    ["Mordok's Tome",              Equipment, ["Tome", "NONE", "NONE", "NONE"],        5,  -1, Quick, 0, 2, "Mage", [1, [1, Arcane, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [ArcaneMageOnly, Legendary, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                        BlankAttacks,                                                                                                                                                                                                                                                                                                                                                                                                                     BlankDefenses, WeaponOrShield, -1, -1, "Legendary * Arcane Mage Only.  This mage may choose one additional spell during the Planning Phase. This gives them an additional spell choice each round (it does not give them an additional spell action)."],
    ["Voice of the Sea",           Equipment, ["Instrument", "Lyre", "NONE", "NONE"],  5,  -1, Quick, 0, 2, "Mage", [1, [1, Water, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                             [SirenOnly, Legendary, Dissipate, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                           BlankAttacks,                                                                                                                                                                                                                                                                                                                                                                                                                     BlankDefenses, WeaponOrShield, -1, -1, "Legendary * Siren Only.  Once per round, this Mage may pay 1 less mana when she casts or reveals a song spell. Enchantments only recieve this discount when they are revealed. When you reveal a song spell, you may place an extra Dissapate token on it."],
    ["Wand of Healing",            Equipment, ["Healing", "Sword", "NONE", "NONE"],    2,  -1, Quick, 0, 2, "Mage", [1, [1, Holy, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [RangedAction, Heal, RemoveCondition, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                       [["Healing Light", Quick, NonAttackMelee,  0, 1, NoDamage, 2, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "2COST Heal target Living creature the amount rolled."], ["Cleansing Light", Quick, NonAttackRanged,  0, 1, NoDamage, -1, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "XCOST Remove 1 condition marker from target Living creature. X = its removal cost."], BlankAttack, BlankAttack], BlankDefenses, WeaponOrShield, -1, -1, "Once per round, this Mage may cast one of the two quick spells shown above."],

    //Weapon And Shields:
    ["Hunting Bow",                Equipment, BlankSubtype,                            11, -1, Quick, 0, 2, "Mage", [3, [3, Nature, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                            [RangedAttack, PiercingPlusX, Bleed, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                        [["Talonhead Arrow", Full, Ranged,  1, 2, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +1"], BlankAttack, BlankAttack, BlankAttack],                       BlankDefenses, WeaponAndShield, -1, -1, "If Hunting Bow is used to attack an enemy creature, that was attacked and damaged by a friendly animal creature this round, this attack gains an additional Piercing +1 and this effect roll: 7+ = Bleed"],
    ["Ivarium Longbow",            Equipment, BlankSubtype,                            8,  -1, Quick, 0, 2, "Mage", [2, [2, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [RangedAttack, PiercingPlusX, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                      [["Voltaric Strike", Full, Ranged,  1, 2, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Piercing +1"], BlankAttack, BlankAttack, BlankAttack],                       BlankDefenses, WeaponAndShield, -1, -1, "NONE"],
    ["War Sledge",                 Equipment, BlankSubtype,                            8,  -1, Quick, 0, 2, "Mage", [2, [2, War, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                               [MeleeAttack, Sweeping, Daze, WarlordOnly, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                           [["Quick Swing", Quick, Melee,  0, 0, Typeless, 4, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"], ["Power Swing", Full, Melee,  0, 0, Typeless, 4, [7, "Daze"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "Sweeping"], BlankAttack, BlankAttack], BlankDefenses, WeaponAndShield, -1, -1, "Warlord Only.  "],

    //No Slot:
    ["Dancing Scimitar",           Equipment, ["Force", "NONE", "NONE", "NONE"],       5,  -1, Quick, 0, 2, "Mage", [2, [2, Mind, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart],                              [MeleeAttack, Defense, UpkeepPlusX, Autonomous, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD],                      [["Flying Slash", Quick, Melee,  0, 0, Typeless, 3, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"], BlankAttack, BlankAttack, BlankAttack],                                 [[8, 1, Melee, "NONE"], BlankDefense], NoSlot, -1, -1, "Upkeep +1 * Autonomous.  Once per round, you can use Dancing Scimitar as a Defense, or it can make its attack. Use a ready marker to keep track of its use."]


    //Incantations:
]

/*List of Mages
Not all info is currently used, could use in future to render Mage cards (look different from other cards, unreasonable to use same format)
Relevant information:
    Name (AKA Class), Cards they are allowed, Training, Opposition, Spellpoints, Channeling, Subclass, Type, Subtype, Attacks, Armor, Life, Abilities

Format: (USE "NONE" WHEN NO VALUE APPLIES FOR STRINGS and -1 FOR INTEGERS (i.e. subclass 4 on all cards, etc.) BUT ALWAYS PUT EVERY ARRAY THAT EXISTS (i.e. a card with no subclass should still have a subtype array with 4 NONEs in it rather than a NONE in place of an array))
[Name, Cards they are allowed, [Training Condition Set 1, Training Condition Set 2, Training Condition Set 3, Training Condition Set 4], [Opposed Condition Set 1, Opposed Condition Set 2, Opposed Condition Set 3, Opposed Condition Set 4], Spellpoints, Channeling, Subclass, Type, [Subtype 1, Subtype 2, Subtype 3, Subtype 4], 
[Attack Info 1, Attack Info 2, Attack Info 3, Attack Info 4], Armor, Life, [Ability Info 1, Ability Info 2, Ability Info 3, Ability Info 4]

Training Info and Opposed Info are formatted as search queries because they vary too much to be easily done as a consistent, simpler format.  i.e. a lot of Mages are trained in one class and opposed to another, but some have weird things (i.e. trained in your choice of one of 4 different classes, trained in Pirate and Song spells, opposed to non-Mind creatures, etc.)

Format for Subarrays:
Training/Opposed Condition Set: [School, InvertSchool, Type, Subtype, Maximum Level]
e.x. Forcemaster is trained in mind and would thus have an array for training of [Mind, Type, "NONE", -1, False].  Forcemaster is opposed to non-Mind creatures and would have an array for opposed of [Mind, Creature, "NONE", -1, True].

Attack Info: [Name, Speed, Ranged/Melee/Zone, Min Range, Max Range, Damage Type, Number of Die, Effect Roll, Text]
Effect Roll: [[Effect Roll Minimum for Effect 1 (USE -1 for NONE), Effect 1], ..., [Effect Roll Minimum for Effect 4, Effect 4]]

Ability Info: [Name, Text]
*/

const BlankTraining = [SCHOOL, false, TYPE, "NONE", -1];

const mages = [
    ["Beastmaster", BeastmasterOnly, [[Nature, false, TYPE, "NONE", -1], BlankTraining, BlankTraining, BlankTraining], [[Fire, false, TYPE, "NONE", -1], BlankTraining, BlankTraining, BlankTraining], 120, 9, "Straywood Forest", Creature, ["Wood Elf", "NONE", "NONE", "NONE"], [["Basic Melee Attack", Quick, Melee,  0, 0, Typeless, 3, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"], BlankAttack, BlankAttack, BlankAttack], 0, 36, [["Quick Summoning", "Once per round, the Beastmaster may summon a Level 1 animal creature spell as a quick spell."], ["PET", "When a friendly non-Legendary animal creature comes into play, you may make it your Pet. Pay mana equal to the creature's Level +1, then place the Pet marker on it. Pet gains Melee +1, Armor +1, and Life +3. Whenever Pet is in the same zone as his Beastmaster, it gains an additional Melee +1. If Pet is destroyed, you may assign the marker again in the same manner when a new animal is summoned."], ["Battle Skill", "Beastmaster has the Melee +1 trait."], ["NONE", "NONE"]]],
    ["Warlord", WarlordOnly, [[War, false, TYPE, "NONE", -1], [Earth, false, TYPE, "NONE", -1], BlankTraining, BlankTraining], [[Arcane, false, TYPE, "NONE", -1], BlankTraining, BlankTraining, BlankTraining], 120, 9, "Anvil Throne", Creature, ["Dwarf", "NONE", "NONE", "NONE"], [["Basic Melee Attack", Quick, Melee,  0, 0, Typeless, 3, [-1, "NONE"],   [-1, "NONE"],   [-1, "NONE"], [-1, "NONE"], "NONE"], BlankAttack, BlankAttack, BlankAttack], 0, 34, [["Runesmithing", "When an equipment comes into play attached to this mage, he may pay 1 mana to assign one Rune to it. If this equipment would be destroyed by a spell or ability an opponent controls, prevent that destruction unless that opponent pays 2 mana. Each Rune may only be assigned once per game."], ["Battle Orders", "Once per round, the Warlord may pay 1 mana and cast one of the following quick command spells. The chosen spell affects all friendly soldier creatures in his zone at the time it is cast, and the effect lasts until the end of the round. Take Aim! - Ranged attacks gain Piercing +2; Quick March! - Gain Fast trait; Hold The Line! - Gain Armor +1 and Tough -2 trait."], ["Battle Hardened", "Warlord has the Tough -2 trait."], ["NONE", "NONE"]]]

]


function nameText(card) {
    return Name(card);
}

function typeText(card) {
    cardType = type(card);
    var text = "";
    if (cardType === AttackSpell) {
        text = "Attack";
    } else if (cardType === Creature) {
        text = "Creature";
    } else if (cardType === Conjuration) {
        text = "Conjuration";
        keywords = keyword(card);
        for (let i = 0; i < keywords.length; i++) {
            if (keywords[i] === Wall) {
                text = "Conjuration - Wall";
            } else if (keywords[i] === Terrain) {
                text = "Conjuration - Terrain";
            } else if (keywords[i] === KEYWORD) {
                i = 25;
            }
        }
    } else if (cardType === Enchantment) {
        text = "Enchantment";
    } else if (cardType === Equipment) {
        text = "Equipment";
    } else if (cardType === Incantation) {
        text = "Incantation";
    }
    return text;
}

function subTypeText(card) {
    var cardSubType = subType(card)
    var text = "";
    for (let i = 0; i < cardSubType.length; i++) {
        if (!(cardSubType[i] === "NONE")) {
            if (i === 0) {
                text = cardSubType[i]
            } else {
                text += ", " + cardSubType[i];
            }
        }
    }
    return text;
}

function costText(card) {
    return cost(card);
}

function revealCostText(card) {
    if (revealCost(card) === -1) {
        return "";
    }
    return revealCost(card);
}

function actionText(card) {
    cardActionText = action(card);
    text = "";
    if (cardActionText === Quick) {
        text = "Quick Action";
    } else if (cardActionText === Full) {
        text = "Full Action";
    }
    return text;
}

function minRangeText(card) {
    return minRange(card);
}

function maxRangeText(card) {
    return maxRange(card);
}

function rangeText(card) {
    return (minRange(card) + "-" + maxRange(card));
}

function targetText(card) {
    return target(card);
}

function levelText(card) {
    cardLevel = level(card);
    text = "Level " + cardLevel[0];
    for (let i = 1; i < cardLevel.length; i++) {
        if (!(cardLevel[i][0] === 0)) {
            if (i > 1) {
                text = text + " and";
            }
            text = text + " Level " + cardLevel[i][0];
            for (let j = 1; j < cardLevel[i].length; j++) {
                if (!(cardLevel[i][j] === SCHOOL)) {
                    if (j > 1) {
                        text = text + " or";
                    }                    
                    if (cardLevel[i][j] === Air) {
                        text = text + " Air"
                    } else if (cardLevel[i][j] === Arcane) {
                        text = text + " Arcane"
                    } else if (cardLevel[i][j] === Dark) {
                        text = text + " Dark"
                    } else if (cardLevel[i][j] === Earth) {
                        text = text + " Earth"
                    } else if (cardLevel[i][j] === Fire) {
                        text = text + " Fire"
                    } else if (cardLevel[i][j] === Holy) {
                        text = text + " Holy"
                    } else if (cardLevel[i][j] === Mind) {
                        text = text + " Mind"
                    } else if (cardLevel[i][j] === Nature) {
                        text = text + " Nature"
                    } else if (cardLevel[i][j] === War) {
                        text = text + " War"
                    } else if (cardLevel[i][j] === Water) {
                        text = text + " Water"
                    }    
                }
            }
        }
    }
    return text;
}

function levelTextTrimmed(card) {
    cardLevel = level(card);
    text = "";
    for (let i = 1; i < cardLevel.length; i++) {
        if (!(cardLevel[i][0] === 0)) {
            if (i > 1) {
                text = text + " and";
            }
            text = text + " Level " + cardLevel[i][0];
            for (let j = 1; j < cardLevel[i].length; j++) {
                if (!(cardLevel[i][j] === SCHOOL)) {
                    if (j > 1) {
                        text = text + " or";
                    }                    
                    if (cardLevel[i][j] === Air) {
                        text = text + " Air"
                    } else if (cardLevel[i][j] === Arcane) {
                        text = text + " Arcane"
                    } else if (cardLevel[i][j] === Dark) {
                        text = text + " Dark"
                    } else if (cardLevel[i][j] === Earth) {
                        text = text + " Earth"
                    } else if (cardLevel[i][j] === Fire) {
                        text = text + " Fire"
                    } else if (cardLevel[i][j] === Holy) {
                        text = text + " Holy"
                    } else if (cardLevel[i][j] === Mind) {
                        text = text + " Mind"
                    } else if (cardLevel[i][j] === Nature) {
                        text = text + " Nature"
                    } else if (cardLevel[i][j] === War) {
                        text = text + " War"
                    } else if (cardLevel[i][j] === Water) {
                        text = text + " Water"
                    }    
                }
            }
        }
    }
    return text;
}

function keywordText(card) {
    cardKeywords = keyword(card);
    text = "Keywords:"
    for (let i = 0; i < cardKeywords.length; i++) {
        if (cardKeywords[i] === -1) {
            i = cardKeywords.length;
        } else {
            if (i > 0) {
                text = text + ","
            }
            text = text + " " + Keywords[cardKeywords[i]]
        }
    }
    return text;
}

function attacksText(card) {
    cardAttacks = attacks(card);
    text = "";
    for (let i = 0; i < cardAttacks.length; i++) {
        if (cardAttacks[i][2] === MELEERANGEDZONETRAMPLEANY) {
            if (text.length > 1) {
                text = text.slice(0, -2);
            }
            return text;
        }
        attack = 0;
        if (cardAttacks[i][2] === Melee || cardAttacks[i][2] === Ranged || cardAttacks[i][2] === Zone || cardAttacks[i][2] === Trample || cardAttacks[i][2] === Passage) {
            attack = 1;
            text = text + "Attack: "
        } else {
            attack = 0;
            text = text + "Action: "
        }
        if (cardAttacks[i][0] !== "NONE") {
            text = text + "name: " + cardAttacks[i][0] + ", "
        }
        if (cardAttacks[i][1] !== ACTION) {
            if (cardAttacks[i][1] === Quick) {
                text = text + "action: Quick, "
            } else if (cardAttacks[i][1] === Full) {
                text = text + "action: Full, "
            }
        }
        if (cardAttacks[i][2] === Melee) {
            text = text + "attack type: Melee, "
        } else if (cardAttacks[i][2] === Ranged) {
            text = text + "attack type: Ranged, "
        } else if (cardAttacks[i][2] === Zone) {
            text = text + "attack type: Zone, "
        } else if (cardAttacks[i][2] === Trample) {
            text = text + "attack type: Trample, "
        } else if (cardAttacks[i][2] === Passage) {
            text = text + "attack type: Passage, "
        } else if (cardAttacks[i][2] === NonAttackMelee) {
            text = text + "action type: Melee, "
        } else if (cardAttacks[i][2] === NonAttackRanged) {
            text = text + "action type: Ranged, "
        } else if (cardAttacks[i][2] === NonAttackZone) {
            text = text + "action type: Zone, "
        }
        if (!(cardAttacks[i][2] === Melee || cardAttacks[i][2] === Trample || cardAttacks[i][2] === NonAttackMelee || cardAttacks[i][2] === Passage)) {
            text = text + "minimum range: " + cardAttacks[i][3] + ", maximum range: " + cardAttacks[i][4] + ", "
        }
        if (cardAttacks[i][5] === Typeless) {
            text = text + "damage type: Typeless, ";
        } else if (cardAttacks[i][5] === Flame) {
            text = text + "damage type: Flame, ";
        } else if (cardAttacks[i][5] === Hydro) {
            text = text + "damage type: Hydro, ";
        } else if (cardAttacks[i][5] === Light) {
            text = text + "damage type: Light, ";
        } else if (cardAttacks[i][5] === Lightning) {
            text = text + "damage type: Lightning, ";
        } else if (cardAttacks[i][5] === Poison) {
            text = text + "damage type: Poison, ";
        } else if (cardAttacks[i][5] === Psychic) {
            text = text + "damage type: Psychic, ";
        } else if (cardAttacks[i][5] === Wind) {
            text = text + "damage type: Wind, ";
        } else if (cardAttacks[i][5] === NoDamage) {
            text = text + "damage type: does not deal damage, ";
        }
        text = text + "damage dice: " + cardAttacks[i][6] + ", ";
        for (let j = 7; j < 11; j++) {
            if (cardAttacks[i][j][1] !== "NONE") {
                text = text + "effect die roll: "
                noNextEffect = false;
                if (j === 10) {
                    noNextEffect = true
                } else if (cardAttacks[i][j + 1][1] === "NONE") {
                    noNextEffect = true
                }
                if (noNextEffect) {
                    text = text + cardAttacks[i][j][0] + "+: " + cardAttacks[i][j][1] + ", "
                } else {
                    text = text + cardAttacks[i][j][0] + "-" + (cardAttacks[i][j + 1][0] - 1) + ": " + cardAttacks[i][j][1] + ", "
                }
            }
        }
        if (cardAttacks[i][11] !== "NONE") {
            text = text + "additional text: " + cardAttacks[i][11] + ", "
        }
    }
    text = text.slice(0, -2);
    return text;
}

function attackText(card, attackIndex) {
    cardAttacks = attacks(card);
    text = "";
    if (cardAttacks[attackIndex][2] === MELEERANGEDZONETRAMPLEANY) {
        if (text.length > 1) {
            text = text.slice(0, -2);
        }
        return text;
    }
    attack = 0;
    if (cardAttacks[attackIndex][2] === Melee || cardAttacks[attackIndex][2] === Ranged || cardAttacks[attackIndex][2] === Zone || cardAttacks[attackIndex][2] === Trample || cardAttacks[attackIndex][2] === Passage) {
        attack = 1;
        text = text + "Attack: "
    } else {
        attack = 0;
        text = text + "Action: "
    }
    if (cardAttacks[attackIndex][0] !== "NONE") {
        text = text + "name: " + cardAttacks[attackIndex][0] + ", "
    }
    if (cardAttacks[attackIndex][1] !== ACTION) {
        if (cardAttacks[attackIndex][1] === Quick) {
            text = text + "action: Quick, "
        } else if (cardAttacks[attackIndex][1] === Full) {
            text = text + "action: Full, "
        }
    }
    if (cardAttacks[attackIndex][2] === Melee) {
        text = text + "attack type: Melee, "
    } else if (cardAttacks[attackIndex][2] === Ranged) {
        text = text + "attack type: Ranged, "
    } else if (cardAttacks[attackIndex][2] === Zone) {
        text = text + "attack type: Zone, "
    } else if (cardAttacks[attackIndex][2] === Trample) {
        text = text + "attack type: Trample, "
    } else if (cardAttacks[attackIndex][2] === Passage) {
        text = text + "attack type: Passage, "
    } else if (cardAttacks[attackIndex][2] === NonAttackMelee) {
        text = text + "action type: Melee, "
    } else if (cardAttacks[attackIndex][2] === NonAttackRanged) {
        text = text + "action type: Ranged, "
    } else if (cardAttacks[attackIndex][2] === NonAttackZone) {
        text = text + "action type: Zone, "
    }
    if (!(cardAttacks[attackIndex][2] === Melee || cardAttacks[attackIndex][2] === Trample || cardAttacks[attackIndex][2] === NonAttackMelee)) {
        text = text + "minimum range: " + cardAttacks[attackIndex][3] + ", maximum range: " + cardAttacks[attackIndex][4] + ", "
    }
    if (cardAttacks[attackIndex][5] === Typeless) {
        text = text + "damage type: Typeless, ";
    } else if (cardAttacks[attackIndex][5] === Flame) {
        text = text + "damage type: Flame, ";
    } else if (cardAttacks[attackIndex][5] === Hydro) {
        text = text + "damage type: Hydro, ";
    } else if (cardAttacks[attackIndex][5] === Light) {
        text = text + "damage type: Light, ";
    } else if (cardAttacks[attackIndex][5] === Lightning) {
        text = text + "damage type: Lightning, ";
    } else if (cardAttacks[attackIndex][5] === Poison) {
        text = text + "damage type: Poison, ";
    } else if (cardAttacks[attackIndex][5] === Psychic) {
        text = text + "damage type: Psychic, ";
    } else if (cardAttacks[attackIndex][5] === Wind) {
        text = text + "damage type: Wind, ";
    } else if (cardAttacks[attackIndex][5] === NoDamage) {
        text = text + "damage type: does not deal damage, ";
    }
    text = text + "damage dice: " + cardAttacks[attackIndex][6] + ", ";
    for (let j = 7; j < 11; j++) {
        if (cardAttacks[attackIndex][j][1] !== "NONE") {
            text = text + "effect die roll: "
            noNextEffect = false;
            if (j === 10) {
                noNextEffect = true
            } else if (cardAttacks[attackIndex][j + 1][1] === "NONE") {
                noNextEffect = true
            }
            if (noNextEffect) {
                text = text + cardAttacks[attackIndex][j][0] + "+: " + cardAttacks[attackIndex][j][1] + ", "
            } else {
                text = text + cardAttacks[attackIndex][j][0] + "-" + (cardAttacks[attackIndex][j + 1][0] - 1) + ": " + cardAttacks[attackIndex][j][1] + ", "
            }
        }
    }
    if (cardAttacks[attackIndex][11] !== "NONE") {
        text = text + "additional text: " + cardAttacks[attackIndex][11] + ", "
    }
    text = text.slice(0, -2);
    return text;
}

function defensesText(card) {
    cardDefenses = defenses(card);
    if (cardDefenses[0][0] === -1) {
        return "";
    }
    text = "Defense: minimum roll: " + cardDefenses[0][0] + ", number of uses: " + cardDefenses[0][1];
    if (cardDefenses[0][2] === Melee) {
        text = text + ", can only be used against melee attacks.";
    } else if (cardDefenses[0][2] === Ranged) {
        text = text + ", can only be used against ranged attacks.";
    } else if (cardDefenses[0][2] === Any) {
        text = text + ", can be used against any attacks.";
    }
    if (cardDefenses[0][3] !== "NONE") {
        text = text + " " + cardDefenses[0][3];
    }

    if (cardDefenses[1][0] === -1) {
        return text;
    }
    text = text + " Defense: minimum roll: " + cardDefenses[1][0] + ", number of uses: " + cardDefenses[1][1];
    if (cardDefenses[1][2] === Melee) {
        text = text + ", can only be used against melee attacks.";
    } else if (cardDefenses[1][2] === Ranged) {
        text = text + ", can only be used against ranged attacks.";
    } else if (cardDefenses[1][2] === Any) {
        text = text + ", can be used against any attacks.";
    }
    if (cardDefenses[1][3] !== "NONE") {
        text = text + " " + cardDefenses[0][3];
    }
    return text;
}

function equipSlotText(card) {
    cardEquipSlot = equipSlot(card);
    if (cardEquipSlot === -1) {
        return "";
    } else if (cardEquipSlot === 1) {
        return "Amulet";
    } else if (cardEquipSlot === 2) {
        return "Belt";
    } else if (cardEquipSlot === 3) {
        return "Boots";
    } else if (cardEquipSlot === 4) {
        return "Chest Piece";
    } else if (cardEquipSlot === 5) {
        return "Cloak";
    } else if (cardEquipSlot === 6) {
        return "Gloves";
    } else if (cardEquipSlot === 7) {
        return "Helmet";
    } else if (cardEquipSlot === 8) {
        return "Ring";
    } else if (cardEquipSlot === 9) {
        return "Shield";
    } else if (cardEquipSlot === 10) {
        return "Weapon";
    } else if (cardEquipSlot === 11) {
        return "Weapon Or Shield";
    } else if (cardEquipSlot === 12) {
        return "Weapon & Shield";
    } else if (cardEquipSlot === 13) {
        return "No Slot";
    }
}

function armorText(card) {
    cardArmor = armor(card);
    if (cardArmor != -1) {
        return cardArmor;
    }
    return "";
}

function lifeText(card) {
    cardLife = life(card);
    if (cardLife != -1) {
        return cardLife;
    }
    return "";
}

function otherTextText(card) {
    cardOtherText = otherText(card);
    if (cardOtherText === "NONE") {
        return "";
    }
    return cardOtherText;
}

function fullText(card) {
    var text = nameText(card);
    text += " " + typeText(card);
    cardSubType = subTypeText(card);
    if (!(cardSubType === "")) {
        text += " " + cardSubType;
    }
    text += " " + costText(card);
    cardRevealCost = revealCostText(card);
    if (!(cardRevealCost === "")) {
        text = text + " " + cardRevealCost;
    }
    text += " " + actionText(card);
    text += " " + minRangeText(card);
    text += " " + maxRangeText(card);
    text += " " + rangeText(card);
    text += " " + targetText(card);
    text += " " + levelText(card);
    cardKeywords = keywordText(card);
    if (!(cardKeywords === "")) {
        text += " " + cardKeywords;
    }
    cardAttacks = attacksText(card);
    if (!(cardAttacks === "")) {
        text += " " + cardAttacks;
    }
    cardDefenses = defensesText(card);
    if (!(cardDefenses === "")) {
        text += " " + cardDefenses;
    }
    cardEquipSlot = equipSlotText(card);
    if (!(cardEquipSlot === "")) {
        text += " " + cardEquipSlot;
    }
    cardArmor = armorText(card);
    if (!(cardArmor === "")) {
        text = text + " " + cardArmor;
    }
    cardLife = lifeText(card);
    if (!(cardLife === "")) {
        text = text + " " + cardLife;
    }
    cardOtherText = otherTextText(card);
    if (!(cardOtherText === "")) {
        text = text + " " + cardOtherText;
    }
    return text;
}

function Name(card) {
    return card[0];
}

function type(card) {
    return card[1];
}

function subType(card) {
    return card[2];
}

function cost(card) {
    return card[3];
}

function revealCost(card) {
    return card[4];
}

function action(card) {
    return card[5];
}

function minRange(card) {
    return card[6];
}

function maxRange(card) {
    return card[7];
}

function target(card) {
    return card[8];
}

function level(card) {
    return card[9];
}

function keyword(card) {
    return card[10];
}

function attacks(card) {
    return card[11];
}

function attackIndex(card, index) {
    return card[11][index];
}

function defenses(card) {
    return card[12];
}

function equipSlot(card) {
    return card[13];
}

function armor(card) {
    return card[14];
}

function life(card) {
    return card[15];
}

function otherText(card) {
    return card[16];
}

var currentDecklist = []; //Stores quantity of each card in currently built deck - starts as array of zeroes that is as long as cards array
for (let i = 0; i < cards.length; i++) {
    currentDecklist.push(0)
}
var currentDeckCost = 0;


const tempTest = document.getElementById("temptest");
const searchButton = document.getElementById("searchButton");
const advancedSearchButton = document.getElementById("advancedSearchButton");
const advancedSearchBars = document.getElementById("advancedSearchBarsDiv");
const cardGrid = document.getElementById("cards");
const searchBar1 = document.getElementById("searchBar1");
const checkBoxes = document.getElementById("checkBoxesDiv");
const mageSelect = document.getElementById("mageSelect");
const deckBuilding = document.getElementById("deckBuildingDiv");
const deckCost = document.getElementById("deckCostDiv");
const decklist = document.getElementById("decklistDiv");

const FullActionImage = "Images/FullAction.png";
const QuickActionImage = "Images/QuickAction.png";

const ArmorImage = "Images/Armor.png";
const LifeImage = "Images/Life.png";
const ChannelingImage = "Images/Channeling.png";
const NoArmorImage = "Images/NoArmor.png";
const DefenseImage = "Images/Defense.png";

const AttackDieImage = "Images/AttackDie.png";
const EffectDieImage = "Images/EffectDie.png";
const MeleeImage = "Images/Melee.png";
const NotMeleeImage = "Images/NotMelee.png";
const RangedImage = "Images/Ranged.png";
const NotRangedImage = "Images/NotRanged.png";
const ZoneImage = "Images/ZoneAttack.png";
const TrampleImage = "Images/Trample.png";
const PassageAttackImage = "Images/PassageAttack.png";
const DamageBarrierImage = "Images/DamageBarrier.png";

const CastRangeImage = "Images/CastRange.png";
const ManaCostImage = "Images/ManaCost.png";

var advancedSearchEnabled = false;
var searchBar2;
var searchBar3;
var coll = document.getElementsByClassName("collapsible");
var cardDivs = document.getElementsByClassName("card");
var currentMage = mages[0];

async function main() {
    searchButton.addEventListener('click', function(){updateCardGrid()});
    advancedSearchButton.addEventListener('click', function(){toggleAdvancedSearch()});
    mageSelect.addEventListener('change', function(){updateSelectedMage()});
    updateCardGrid();
    // generateCheckBoxes();

    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            content.style.transition = "max-height 0.2s ease-out";
            if (content.style.maxHeight){
            content.style.maxHeight = null;
            } else {
            content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
    }
    // for (let i = 0; i < cardDivs.length; i++) {      //done in updateCardGrid
    //     cardDivs[i].addEventListener("click", function() {
    //         currentDecklist[i] = currentDecklist[i] + 1;
    //         updateDeckCost();
    //     });
    // }
}

function generateCheckBoxes() {
    var checkBoxDiv = document.createElement('input');
    checkBoxDiv.className = "checkBox";
    checkBoxDiv.id = "checkboxtest";
    checkBoxDiv.type = "checkbox";
    checkBoxDiv.name = "checkboxtest";
    checkBoxDiv.value = "checkboxtest";
    checkBoxes.appendChild(checkBoxDiv);
    var checkBoxLabel = document.createElement('label');
    checkBoxLabel.className = "checkBoxLabel";
    checkBoxLabel.id = "checkboxlabel";
    checkBoxLabel.htmlFor = "checkboxtest";
    checkBoxLabel.innerHTML = " checkboxtest";
    checkBoxes.appendChild(checkBoxLabel);
}

function updateDeckCost() {
    currentDeckCost = 0;
    for (let i = 0; i < currentDecklist.length; i++) {
        if (currentDecklist[i] > 0) {
            var cardCost = getCardSpellpointCost(cards[i], currentMage);
            currentDeckCost = currentDeckCost + cardCost * currentDecklist[i];
        }
    }
    deckCost.textContent = "Spell Point Cost of Current Deck: " + currentDeckCost;
}

function updateDecklist() {
    decklist.innerHTML = "";
    for (let i = 0; i < currentDecklist.length; i++) {
        if (currentDecklist[i] > 0) {
            var currentCardName = Name(cards[i]);
            var decklistCardDiv = document.createElement('div');
            decklistCardDiv.className = "decklistCard";
            decklistCardDiv.textContent = currentCardName + " * " + currentDecklist[i];
            decklist.appendChild(decklistCardDiv);

            decklistCardDiv.addEventListener("click", function() {
                currentDecklist[i] = currentDecklist[i] - 1;
                updateDecklist();
                updateDeckCost();
            });
        }
    }
    deckBuilding.style.transition = "none";
    if (deckBuilding.style.maxHeight) {
        deckBuilding.style.maxHeight = deckBuilding.scrollHeight + "px";
    }
    // deckBuilding.style.transition = "max-height 0.2s ease-out";


}

function updateSelectedMage() {
    newMageName = mageSelect.value;
    for (let i = 0; i < mages.length; i++) {
        if (newMageName === mages[i][0]) {
            currentMage = mages[i];
        }
    }
    updateDeckCost();
}


function toggleAdvancedSearch() {
    if (advancedSearchEnabled === false) {
        advancedSearchEnabled = true;
    } else {
        advancedSearchEnabled = false;
    }
    if (advancedSearchEnabled === false) {
        advancedSearchBars.innerHTML = "";
    } else {
        var secondBarDiv = document.createElement('input');
        secondBarDiv.className = "searchBar";
        secondBarDiv.id = "searchBar2";
        secondBarDiv.type = "text";
        secondBarDiv.placeholder = "Search for cards..";
        advancedSearchBars.appendChild(secondBarDiv);
        var thirdBarDiv = document.createElement('input');
        thirdBarDiv.className = "searchBar";
        thirdBarDiv.id = "searchBar3";
        thirdBarDiv.type = "text";
        thirdBarDiv.placeholder = "Search for cards..";
        advancedSearchBars.appendChild(thirdBarDiv);
        searchBar2 = document.getElementById("searchBar2");
        searchBar3 = document.getElementById("searchBar3");
    }
}

function updateCardGrid() {
    cardGrid.innerHTML = "";
    updateTempTest();
    foundCards = cards;
    tempCards = [];

    typeBubble = Number(document.querySelector('input[name="typeRadio"]:checked').value);
    if (typeBubble !== TYPE) {
        for (let i = 0; i < foundCards.length; i++) {
            if (type(foundCards[i]) === typeBubble) {
                tempCards.push(foundCards[i]);
            }
        }
        foundCards = tempCards;
    } 

    tempCards = [];
    schoolBubble = Number(document.querySelector('input[name="schoolRadio"]:checked').value);
    if (schoolBubble !== SCHOOL) {
        for (let i = 0; i < foundCards.length; i++) {
            cardLevel = level(foundCards[i]);
            for (let j = 1; j < 5; j++) {
                for (let k = 1; k < 6; k++) {
                    if (cardLevel[j][k] === schoolBubble) {
                        tempCards.push(foundCards[i]);
                        j = 6
                        k = 6
                    }
                }
            }
        }
        foundCards = tempCards;
    }

    tempCards = [];
    actionBubble = Number(document.querySelector('input[name="actionRadio"]:checked').value);
    if (actionBubble !== ACTION) {
        for (let i = 0; i < foundCards.length; i++) {
            if (action(foundCards[i]) === actionBubble) {
                tempCards.push(foundCards[i]);
            }
        }
        foundCards = tempCards;
    }

    tempCards = [];
    slotBubble = Number(document.querySelector('input[name="slotRadio"]:checked').value);
    if (slotBubble !== SLOT) {
        for (let i = 0; i < foundCards.length; i++) {
            if (equipSlot(foundCards[i]) === slotBubble) {
                tempCards.push(foundCards[i]);
            }
        }
        foundCards = tempCards;
    }

    tempCards = [];
    query = (searchBar1.value).toLowerCase();
    if (query !== "") {
        queryConditions1 = query.split(",");
        for (let i = 0; i < queryConditions1.length; i++) {
            queryConditions1[i] = queryConditions1[i].trim();
        }
        for (let i = 0; i < foundCards.length; i++) {
            for (let j = 0; j < queryConditions1.length; j++) {
                if (fullText(foundCards[i]).toLowerCase().includes(queryConditions1[j])) {
                    tempCards.push(foundCards[i]);
                    j = queryConditions1.length;
                }
            }
        }
        foundCards = tempCards;
    }

    if (advancedSearchEnabled === true) {
        tempCards = [];
        query2 = (searchBar2.value).toLowerCase();
        if (query2 !== "") {
            queryConditions2 = query2.split(",");
            for (let i = 0; i < queryConditions2.length; i++) {
                queryConditions2[i] = queryConditions2[i].trim();
            }
            for (let i = 0; i < foundCards.length; i++) {
                for (let j = 0; j < queryConditions2.length; j++) {
                    if (fullText(foundCards[i]).toLowerCase().includes(queryConditions2[j])) {
                        tempCards.push(foundCards[i]);
                        j = queryConditions2.length;
                    }
                }
            }
            foundCards = tempCards;
        }

        tempCards = [];
        query3 = (searchBar3.value).toLowerCase();
        if (query3 !== "") {
            queryConditions3 = query3.split(",");
            for (let i = 0; i < queryConditions3.length; i++) {
                queryConditions3[i] = queryConditions3[i].trim();
            }
            for (let i = 0; i < foundCards.length; i++) {
                for (let j = 0; j < queryConditions3.length; j++) {
                    if (fullText(foundCards[i]).toLowerCase().includes(queryConditions3[j])) {
                        tempCards.push(foundCards[i]);
                        j = queryConditions3.length;
                    }
                }
            }
            foundCards = tempCards;
        }
    }
    for (let i = 0; i < foundCards.length; i++) {
        addCardToGrid(foundCards[i]);
    }
    var newCardDivs = document.getElementsByClassName("card");
    for (let i = 0; i < newCardDivs.length; i++) {
        var cardName = Name(foundCards[i]);
        let index = -1;
        for (let j = 0; j < cards.length; j++) {
            if (Name(cards[j]) === cardName) {
                index = j;
            }
        }
        newCardDivs[i].addEventListener("click", function() {
            var cardKeywords = keyword(cards[index]);
            var epic = false;
            for (let j = 0; j < cardKeywords.length; j++) {
                if (cardKeywords[j] === Epic) {
                    epic = true;
                }
            }
            var level1 = false;
            if (level(cards[index])[0] === 1) {
                level1 = true;
            }
            if (currentDecklist[index] >= 6 || (currentDecklist[index] >= 4 && !level1) || (currentDecklist[index] >= 1 && epic)) {
                //can't add to deck due to deckbuilding restrictions
            } else {
                currentDecklist[index] = currentDecklist[index] + 1;
                updateDecklist();
                updateDeckCost();
            }        
        });
    }
}

// Training/Opposed Condition Set: [School, Type, Subtype, Maximum Level, Invert]
// e.x. Forcemaster is trained in mind and would thus have an array for training of [Mind, Type, "NONE", -1, False].  Forcemaster is opposed to non-Mind creatures and would have an array for opposed of [Mind, Creature, "NONE", -1, True].
// [1, [1, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart]

function getCardSpellpointCost(card, mage) {
    var cardType = type(card);
    var cardSubtypes = subType(card);
    var cardLevel = level(card);
    var mageTraining = mage[2];
    var mageOpposition = mage[3];

    var totalCost = 0;
    //Get cost for each part of card level
    for (let i = 1; i < cardLevel.length; i++) { //loop over each part of card's level
        if (cardLevel[i] !== BlankLevelPart) { //ignore empty level parts
            var trained = false;
            var opposed = false;
            for (let j = 0; j < mageTraining.length; j++) { //loop over each training part
                if (mageTraining[j] !== BlankTraining) { //ignore empty training parts
                    if ((((mageTraining[j][0] === cardLevel[i][1] || mageTraining[j][0] === cardLevel[i][2] || mageTraining[j][0] === cardLevel[i][3] || mageTraining[j][0] === cardLevel[i][4]) && !mageTraining[j][1]) || ((mageTraining[j][0] !== cardLevel[i][1] || mageTraining[j][0] !== cardLevel[i][2] || mageTraining[j][0] !== cardLevel[i][3] || mageTraining[j][0] !== cardLevel[i][4]) && mageTraining[j][1]) || mageTraining[j][0] === -1)
                        && (mageTraining[j][2] === cardType || mageTraining[j][2] === TYPE) 
                        && (mageTraining[j][3] === cardSubtypes[0] || mageTraining[j][3] === cardSubtypes[1] || mageTraining[j][3] === cardSubtypes[2] || mageTraining[j][3] === cardSubtypes[3] || mageTraining[j][3] === "NONE") 
                        && (mageTraining[j][4] >= cardLevel[i][0] || mageTraining[j][4] === -1)) {
                        
                        if (!mageTraining[4]) {
                            trained = true;
                        }

                    } else {
                        if (mageTraining[4]) {
                            trained = true;
                        }
                    }
                }
            }
            if (!trained) {
                for (let j = 0; j < mageOpposition.length; j++) { //loop over each opposition part
                    if (mageOpposition[j] !== BlankTraining) { //ignore empty opposition parts
                        if (((((mageOpposition[j][0] === cardLevel[i][1] || cardLevel[i][1] === SCHOOL) && (mageOpposition[j][0] === cardLevel[i][2] || cardLevel[i][2] === SCHOOL) && (mageOpposition[j][0] === cardLevel[i][3] || cardLevel[i][3] === SCHOOL) && (mageOpposition[j][0] === cardLevel[i][4] || cardLevel[i][4] === SCHOOL)) && !mageOpposition[j][1]) || (((mageOpposition[j][0] !== cardLevel[i][1] || cardLevel[i][1] === SCHOOL) && (mageOpposition[j][0] !== cardLevel[i][2] || cardLevel[i][2] === SCHOOL) && (mageOpposition[j][0] !== cardLevel[i][3] || cardLevel[i][3] === SCHOOL) && (mageOpposition[j][0] !== cardLevel[i][4] || cardLevel[i][4] === SCHOOL)) && mageOpposition[j][1]) || mageOpposition[j][0] === -1)
                            && (mageOpposition[j][2] === cardType || mageOpposition[j][2] === TYPE) 
                            && (mageOpposition[j][3] === cardSubtypes[0] || mageOpposition[j][3] === cardSubtypes[1] || mageOpposition[j][3] === cardSubtypes[2] || mageOpposition[j][3] === cardSubtypes[3] || mageOpposition[j][3] === "NONE") 
                            && (mageOpposition[j][4] >= cardLevel[i][0] || mageOpposition[j][4] === -1)) {
                            
                            if (!mageOpposition[4]) {
                                opposed = true;
                            }

                        } else {
                            if (mageOpposition[4]) {
                                opposed = true;
                            }
                        }
                    }
                }
            }
            if (trained) {
                totalCost = totalCost + cardLevel[i][0];
            } else if (opposed) {
                totalCost = totalCost + cardLevel[i][0] * 3;
            } else {
                totalCost = totalCost + cardLevel[i][0] * 2;
            }
        }
    }
    return totalCost;
}

function isTrained(card, mage) {
    if (getCardSpellpointCost(card, mage) < level(card)[0]*2) {
        return true;
    }
    return false;
}

function isOpposed(card, mage) {
    if (getCardSpellpointCost(card, mage) > level(card)[0]*2) {
        return true;
    }
    return false;
}

function cardMeetsCondition(card, index1, index2, index3, index4, value1, value2, value3, value4, invert) { //Currently Unused
    var relevantValue;
    if (index2 === -1) {
        relevantValue = card[index1];
    } else if (index3 === -1) {
        relevantValue = card[index1][index2];
    } else if (index4 === -1) {
        relevantValue = card[index1][index2][index3];
    } else {
        relevantValue = card[index1][index2][index3][index4];
    }
    if (relevantValue === value1 || relevantValue === value2 || relevantValue === value3 || relevantValue === value4) {
        if (invert === true) {
            return false;
        } else {
            return true;
        }
    }
    if (invert === true) {
        return true;
    } else {
        return false;
    }

}

function addCardToGrid(card) {
    var cardDiv = document.createElement('div');
    //cardDiv.id = 'block';
    if (type(card) === AttackSpell) {
        cardDiv.className = 'cardAttackSpell card';
    } else if (type(card) === Creature) {
        cardDiv.className = 'cardCreature card';
    } else if (type(card) === Conjuration) {
        cardDiv.className = 'cardConjuration card';
    } else if (type(card) === Enchantment) {
        cardDiv.className = 'cardEnchantment card';
    } else if (type(card) === Equipment) {
        cardDiv.className = 'cardEquipment card';
    } else if (type(card) === Incantation) {
        cardDiv.className = 'cardIncantation card';
    }
    cardGrid.appendChild(cardDiv);

    var topBarDiv = document.createElement('div');
    topBarDiv.className = "topBar";
    cardDiv.appendChild(topBarDiv);
    var nameDiv = document.createElement('div');
    if (nameText(card).length <= 15) {
        nameDiv.className = "shortName";
    } else if (nameText(card).length <= 22) {
        nameDiv.className = "mediumName";
    } else {
        nameDiv.className = "longName";
    }
    nameDiv.textContent = nameText(card);
    topBarDiv.appendChild(nameDiv);
    var typeSubclassDiv = document.createElement('div');
    typeSubclassDiv.className = "typeSubclass";
    topBarDiv.appendChild(typeSubclassDiv);
    var typeDiv = document.createElement('div');
    typeDiv.className = "type";
    typeDiv.textContent = typeText(card).toUpperCase();
    typeSubclassDiv.appendChild(typeDiv);
    var subclassDiv = document.createElement('div');
    subclassDiv.className = "subclass";
    subclassDiv.textContent = subTypeText(card);
    typeSubclassDiv.appendChild(subclassDiv);
    

    var secondBarDiv = document.createElement('div');
    secondBarDiv.className = "secondBar";
    cardDiv.appendChild(secondBarDiv);

    var costDiv = document.createElement('div');
    costDiv.className = "cost";
    secondBarDiv.appendChild(costDiv);
    var manaCostImg = document.createElement('img');
    manaCostImg.className = "manaCostImage";
    manaCostImg.src = ManaCostImage;
    costDiv.appendChild(manaCostImg);
    var manaCostTextDiv = document.createElement('div');
    manaCostTextDiv.className = "manaCostText";
    manaCostTextDiv.textContent = costText(card);
    costDiv.appendChild(manaCostTextDiv);

    if (action(card) === Quick) {
        var actionDiv = document.createElement('img');
        actionDiv.className = "action";
        actionDiv.src = QuickActionImage;
        secondBarDiv.appendChild(actionDiv);
    } else if (action(card) === Full) {
        var actionDiv = document.createElement('img');
        actionDiv.className = "action";
        actionDiv.src = FullActionImage;
        secondBarDiv.appendChild(actionDiv);
    }   
    
    var rangeDiv = document.createElement('div');
    rangeDiv.className = "range";
    secondBarDiv.appendChild(rangeDiv);
    var rangeImg = document.createElement('img');
    rangeImg.className = "rangeImage";
    rangeImg.src = CastRangeImage;
    rangeDiv.appendChild(rangeImg);
    var rangeTextDiv = document.createElement('div');
    rangeTextDiv.className = "rangeText";
    rangeTextDiv.textContent = rangeText(card);
    rangeDiv.appendChild(rangeTextDiv);

    var targetDiv = document.createElement('div');
    targetDiv.className = "target";
    targetDiv.textContent = targetText(card);
    secondBarDiv.appendChild(targetDiv);
    var levelDiv = document.createElement('div');
    levelDiv.className = "level";
    levelDiv.textContent = levelTextTrimmed(card);
    secondBarDiv.appendChild(levelDiv);

    var middleDiv = document.createElement('div');
    middleDiv.className = "middle";
    cardDiv.appendChild(middleDiv);

    if (type(card) === Creature || type(card) === Conjuration) {
        var fourthItem = false;
        
        for (let j = 1; j >= 0; j--) {
            if (defenses(card)[j][2] !== MELEERANGEDZONETRAMPLEANY) {
                var currentDefense = defenses(card)[j];
                var defenseDiv = document.createElement('div');
                if (fourthItem) {
                    defenseDiv.className = "raisedDefense";
                } else {
                    defenseDiv.className = "defense";
                }
                middleDiv.appendChild(defenseDiv);
                var defenseImg = document.createElement('img');
                defenseImg.className = "defenseImage";
                defenseImg.src = DefenseImage;
                defenseDiv.appendChild(defenseImg);
                var defenseRollTextDiv = document.createElement('div');
                defenseRollTextDiv.className = "defenseRollText";
                defenseRollTextDiv.textContent = (currentDefense[0] + "+");
                defenseDiv.appendChild(defenseRollTextDiv);
                var defenseUsesTextDiv = document.createElement('div');
                defenseUsesTextDiv.className = "defenseUsesText";
                if (currentDefense[1] === -1) {
                    defenseUsesTextDiv.textContent = ("∞");
                } else {
                    defenseUsesTextDiv.textContent = (currentDefense[1] + "x");
                }
                defenseDiv.appendChild(defenseUsesTextDiv);
                if (currentDefense[2] !== Any) {
                    var defenseAttackTypeImg = document.createElement('img');
                    defenseAttackTypeImg.className = "defenseAttackType";
                    if (currentDefense[2] === Melee) {
                        defenseAttackTypeImg.src = NotRangedImage;
                    } else {
                        defenseAttackTypeImg.src = NotMeleeImage;
                    }
                    middleDiv.appendChild(defenseAttackTypeImg);
                }
                fourthItem = true;
            }
        }

        if (otherText(card).includes("Channeling ")) {
            var channelingDiv = document.createElement('div');
            if (fourthItem) {
                channelingDiv.className = "raisedChanneling";
            } else {
                channelingDiv.className = "channeling";
            }
            middleDiv.appendChild(channelingDiv);
            var channelingImg = document.createElement('img');
            channelingImg.className = "channelingImage";
            channelingImg.src = ChannelingImage;
            channelingDiv.appendChild(channelingImg);
            var channelingTextDiv = document.createElement('div');
            channelingTextDiv.className = "channelingText";
            var channelingValue = (otherText(card).split("Channeling ")[1]).split("")[0];
            channelingTextDiv.textContent = channelingValue;
            channelingDiv.appendChild(channelingTextDiv);
            fourthItem = true;
        }        
        
        if (life(card) !== -1) {
            if (armor(card) !== -1) {
                var armorDiv = document.createElement('div');
                armorDiv.className = "armor";
                middleDiv.appendChild(armorDiv);
                var armorImg = document.createElement('img');
                armorImg.className = "armorImage";
                armorImg.src = ArmorImage;
                armorDiv.appendChild(armorImg);
                var armorTextDiv = document.createElement('div');
                armorTextDiv.className = "armorText";
                armorTextDiv.textContent = armorText(card);
                armorDiv.appendChild(armorTextDiv);
            } else {
                var armorDiv = document.createElement('div');
                armorDiv.className = "armor";
                middleDiv.appendChild(armorDiv);
                var armorImg = document.createElement('img');
                armorImg.className = "armorImage";
                armorImg.src = NoArmorImage;
                armorDiv.appendChild(armorImg);
            }

            var lifeDiv = document.createElement('div');
            lifeDiv.className = "life";
            middleDiv.appendChild(lifeDiv);
            var lifeImg = document.createElement('img');
            lifeImg.className = "lifeImage";
            lifeImg.src = LifeImage;
            lifeDiv.appendChild(lifeImg);
            var lifeTextDiv = document.createElement('div');
            lifeTextDiv.className = "lifeText";
            lifeTextDiv.textContent = lifeText(card);
            lifeDiv.appendChild(lifeTextDiv);
        }
        
    } else if (type(card) === Equipment) {
        for (let j = 1; j >= 0; j--) {
            if (defenses(card)[j][2] !== MELEERANGEDZONETRAMPLEANY) {
                var currentDefense = defenses(card)[j];
                var defenseDiv = document.createElement('div');
                defenseDiv.className = "unraisedDefense";
                middleDiv.appendChild(defenseDiv);
                var defenseImg = document.createElement('img');
                defenseImg.className = "defenseImage";
                defenseImg.src = DefenseImage;
                defenseDiv.appendChild(defenseImg);
                var defenseRollTextDiv = document.createElement('div');
                defenseRollTextDiv.className = "defenseRollText";
                defenseRollTextDiv.textContent = (currentDefense[0] + "+");
                defenseDiv.appendChild(defenseRollTextDiv);
                var defenseUsesTextDiv = document.createElement('div');
                defenseUsesTextDiv.className = "defenseUsesText";
                if (currentDefense[1] === -1) {
                    defenseUsesTextDiv.textContent = ("∞");
                } else {
                    defenseUsesTextDiv.textContent = (currentDefense[1] + "x");
                }
                defenseDiv.appendChild(defenseUsesTextDiv);
                if (currentDefense[2] !== Any) {
                    var defenseAttackTypeImg = document.createElement('img');
                    defenseAttackTypeImg.className = "unraisedDefenseAttackType";
                    if (currentDefense[2] === Melee) {
                        defenseAttackTypeImg.src = NotRangedImage;
                    } else {
                        defenseAttackTypeImg.src = NotMeleeImage;
                    }
                    middleDiv.appendChild(defenseAttackTypeImg);
                }
            }
        }

        if (otherText(card).includes("Channeling ")) {
            var channelingDiv = document.createElement('div');
            channelingDiv.className = "unraisedChanneling";
            middleDiv.appendChild(channelingDiv);
            var channelingImg = document.createElement('img');
            channelingImg.className = "channelingImage";
            channelingImg.src = ChannelingImage;
            channelingDiv.appendChild(channelingImg);
            var channelingTextDiv = document.createElement('div');
            channelingTextDiv.className = "channelingText";
            var channelingValue = (otherText(card).split("Channeling ")[1]).split("")[0];
            channelingTextDiv.textContent = channelingValue;
            channelingDiv.appendChild(channelingTextDiv);
        }        
    }

    var bottomDiv = document.createElement('div');
    bottomDiv.className = "bottom";
    cardDiv.appendChild(bottomDiv);
    for (let i = 0; i < 4; i++) {
        currentAttack = attackIndex(card, i);
        if (currentAttack[2] !== MELEERANGEDZONETRAMPLEANY) {
            var attackDiv = document.createElement('div');
            attackDiv.className = "attack";
            bottomDiv.appendChild(attackDiv);
            if (currentAttack[11].substring(1, 5) === "COST") {
                var attackCostDiv = document.createElement('div');
                attackCostDiv.className = "attackCost";
                attackDiv.appendChild(attackCostDiv);
                var attackCostImg = document.createElement('img');
                attackCostImg.className = "attackCostImageContainer";
                attackCostImg.src = ManaCostImage;
                attackCostDiv.appendChild(attackCostImg);
                var attackCostTextDiv = document.createElement('div');
                attackCostTextDiv.className = "attackCostText";
                attackCostTextDiv.textContent = currentAttack[11].substring(0, 1);
                attackCostDiv.appendChild(attackCostTextDiv);
            }
            if (type(card) === Creature || type(card) === Equipment){
                if (currentAttack[1] === Quick) {
                    var attackActionImg = document.createElement('img');
                    attackActionImg.className = "attackAction";
                    attackActionImg.src = QuickActionImage;
                    attackDiv.appendChild(attackActionImg);
                } else if (currentAttack[1] === Full) {
                    var attackActionImg = document.createElement('img');
                    attackActionImg.className = "attackAction";
                    attackActionImg.src = FullActionImage;
                    attackDiv.appendChild(attackActionImg);
                }       
            }
            if (currentAttack[2] === Melee || currentAttack[2] === Ranged || currentAttack[2] === NonAttackRanged || currentAttack[2] === Zone || currentAttack[2] === Trample || currentAttack[2] === Passage || currentAttack[2] === DamageBarrier) {
                if (currentAttack[2] === Melee) {
                    var attackTypeImg = document.createElement('img');
                    attackTypeImg.className = "attackTypeImage";
                    attackTypeImg.src = MeleeImage;
                    attackDiv.appendChild(attackTypeImg);
                } else if (currentAttack[2] === Trample) {
                    var attackTypeImg = document.createElement('img');
                    attackTypeImg.className = "attackTypeImage";
                    attackTypeImg.src = TrampleImage;
                    attackDiv.appendChild(attackTypeImg);
                } else if (currentAttack[2] === Passage) {
                    var attackTypeImg = document.createElement('img');
                    attackTypeImg.className = "attackTypeImage";
                    attackTypeImg.src = PassageAttackImage;
                    attackDiv.appendChild(attackTypeImg);
                } else if (currentAttack[2] === DamageBarrier) {
                    var attackTypeImg = document.createElement('img');
                    attackTypeImg.className = "attackTypeImage";
                    attackTypeImg.src = DamageBarrierImage;
                    attackDiv.appendChild(attackTypeImg);
                } else if (currentAttack[2] === Ranged || currentAttack[2] === NonAttackRanged || currentAttack[2] === Zone) {
                    if (type(card) === Creature || type(card) === Equipment) {
                        var attackTypeDiv = document.createElement('div');
                        attackTypeDiv.className = "attackType";
                        attackDiv.appendChild(attackTypeDiv);
                        var attackTypeImg = document.createElement('img');
                        attackTypeImg.className = "attackTypeImageContainer";
                        attackTypeImg.src = RangedImage;
                        attackTypeDiv.appendChild(attackTypeImg);
                        var attackTypeTextDiv = document.createElement('div');
                        attackTypeTextDiv.className = "attackTypeText";
                        attackTypeTextDiv.textContent = currentAttack[3] + "-" + currentAttack[4];
                        attackTypeDiv.appendChild(attackTypeTextDiv);
                    } else {
                        var attackTypeImg = document.createElement('img');
                        attackTypeImg.className = "attackTypeImage";
                        attackTypeImg.src = RangedImage;
                        attackDiv.appendChild(attackTypeImg);
                    }
                    
                }
                if (currentAttack[2] === Zone) {
                    var attackTypeImg = document.createElement('img');
                    attackTypeImg.className = "attackTypeImage";
                    attackTypeImg.src = ZoneImage;
                    attackDiv.appendChild(attackTypeImg);
                }
                if (currentAttack[5] !== Typeless && currentAttack[5] !== NoDamage) {
                    var attackDamageTypeDiv = document.createElement('div');
                    attackDamageTypeDiv.className = "attackDamageType";
                    if (currentAttack[5] === Flame) {
                        attackDamageTypeDiv.textContent = "Flame";
                    } else if (currentAttack[5] === Hydro) {
                        attackDamageTypeDiv.textContent = "Hydro";
                    } else if (currentAttack[5] === Light) {
                        attackDamageTypeDiv.textContent = "Light";
                    } else if (currentAttack[5] === Lightning) {
                        attackDamageTypeDiv.textContent = "Lightning";
                    } else if (currentAttack[5] === Poison) {
                        attackDamageTypeDiv.textContent = "Poison";
                    } else if (currentAttack[5] === Psychic) {
                        attackDamageTypeDiv.textContent = "Psychic";
                    } else if (currentAttack[5] === Wind) {
                        attackDamageTypeDiv.textContent = "Wind";
                    }
                    attackDiv.appendChild(attackDamageTypeDiv);
                }
                if (currentAttack[2] !== NonAttackRanged && currentAttack[2] !== NonAttackMelee){
                    var attackDiceDiv = document.createElement('div');
                    attackDiceDiv.className = "attackDice";
                    attackDiv.appendChild(attackDiceDiv);
                    var attackDiceImg = document.createElement('img');
                    attackDiceImg.className = "attackDiceImage";
                    attackDiceImg.src = AttackDieImage;
                    attackDiceDiv.appendChild(attackDiceImg);
                    var attackDiceTextDiv = document.createElement('div');
                    attackDiceTextDiv.className = "attackDiceText";
                    attackDiceTextDiv.textContent = currentAttack[6];
                    attackDiceDiv.appendChild(attackDiceTextDiv);
                }
                
                if (currentAttack[7][0] !== -1) {
                    var attackEffectDiv = document.createElement('div');
                    attackEffectDiv.className = "attackEffect";
                    attackDiv.appendChild(attackEffectDiv);
                    var attackEffectImg = document.createElement('img');
                    attackEffectImg.className = "attackEffectImage";
                    attackEffectImg.src = EffectDieImage;
                    attackEffectDiv.appendChild(attackEffectImg);
                    var effectText = "";
                    for (let j = 10; j >= 7; j--) {
                        if (currentAttack[j][0] !== -1) {
                            if (effectText === "") {
                                effectText = "" + currentAttack[j][0] + "+ = " + currentAttack[j][1];
                            } else {
                                effectText = "" + currentAttack[j][0] + "-" + (currentAttack[j+1][0] - 1) + " = " + currentAttack[j][1] + "<br>"+ effectText;
                            }
                        }
                    }
                    var attackEffectTextDiv = document.createElement('div');
                    attackEffectTextDiv.className = "attackEffectText";
                    attackEffectTextDiv.innerHTML = effectText;
                    attackEffectDiv.appendChild(attackEffectTextDiv);
                }
            }
            if (currentAttack[11] !== "NONE") {
                var attackTextDiv = document.createElement('div');
                if (currentAttack[7][0] !== -1 && currentAttack[5] !== Typeless && currentAttack[2] === Zone && (currentAttack[1] === Quick || currentAttack[1] === Full)) {
                    attackTextDiv.className = "attackTextCompressed";
                } else if (currentAttack[7][0] === -1) {
                    attackTextDiv.className = "attackTextDecompressed";
                } else {
                    attackTextDiv.className = "attackText";
                }
                if (currentAttack[11].substring(1, 5) !== "COST") {
                    attackTextDiv.textContent = currentAttack[11];
                } else {
                    attackTextDiv.textContent = currentAttack[11].substring(5);
                }
                attackDiv.appendChild(attackTextDiv);
            }
        }
    }
    var textDiv = document.createElement('div');
    textDiv.className = "text";
    var currentOtherTextSplit = otherText(card).split(".  ");
    var currentOtherText = currentOtherTextSplit[0];
    if (currentOtherText === "NONE") {
        currentOtherText = "";
    }
    if (currentOtherTextSplit.length > 1) {
        currentOtherText = "<span style=\"font-weight:bold\">" + currentOtherText + "</span>";
    }
    for (let j = 1; j < currentOtherTextSplit.length; j++) {
        currentOtherText = currentOtherText + "<br>" + currentOtherTextSplit[j];
    }
    textDiv.innerHTML = currentOtherText;
    bottomDiv.appendChild(textDiv);
}

function updateTempTest() {
    // tempTest.textContent=fullText(cards[1]);
}

main()