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
const Flame = 2
const Hydro = 3
const Light = 4
const Lightning = 5
const Poison = 6
const Psychic = 7
const Wind = 8
const NoDamage = 9

const MELEERANGEDZONETRAMPLEANY = -1 //Use for both attacks and defenses (category for attack, valid attacks to defend against for defenses)
const Melee = 1
const Ranged = 2
const Zone = 3
const Trample = 4
const DamageBarrier = 5
const NonAttackMelee = 6
const NonAttackRanged = 7
const NonAttackZone = 8
const Any = 9

//This section largely generated by Python code fed list of keywords, tuned to make keywords look better - I added all the spaces in the strings individually
Keywords = []
Keywords.length = 199
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
const BlankLevelPart = [0, SCHOOL, SCHOOL, SCHOOL, SCHOOL, SCHOOL]
const BlankAttack = ["NONE", ACTION, MELEERANGEDZONETRAMPLEANY, -1, -1, DamageType, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"]  
const BlankAttacks = [BlankAttack, BlankAttack, BlankAttack, BlankAttack]
const BlankDefense = [-1, -1, MELEERANGEDZONETRAMPLEANY, "NONE"]
const BlankDefenses = [BlankDefense, BlankDefense]
const cards = [                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    //Attack Spells:
    //Creatures:
    //["NAME", Creature, ["NONE", "NONE", "NONE", "NONE"], COST, -1, Full, 0, 0, "Zone", [-1, [0, SCHOOL, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart], [KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD], ["NONE", ACTION, MELEERANGEDZONETRAMPLEANY, -1, -1, DamageType, -1, [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], [-1, "NONE"], "NONE"], BlankAttack, BlankAttack, BlankAttack, BlankDefenses, SLOT, -1, -1, ""]                                                                                                      
    
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
    
    //Air Primary:
    ["Whirling Spirit", Creature, ["Wind", "NONE", "NONE", "NONE"], 12, -1, Full, 0, 0, "Zone", [4, [4, Air, SCHOOL, SCHOOL, SCHOOL, SCHOOL], BlankLevelPart, BlankLevelPart, BlankLevelPart], [MeleeAttack, Incorporeal, Ethereal, Push, Daze, Condition, WindDamage, UpkeepPlusX, Nonliving, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD, KEYWORD], [["Windstorm", Quick, Melee, 0, 0, Wind, 4, [7, "Push"], [11, "Push & Daze"], [-1, "NONE"], [-1, "NONE"], "Ethereal, +2 vs. Incorporeal"], BlankAttack, BlankAttack, BlankAttack], BlankDefenses, SLOT, -1, 13, "Upkeep +1, Incorporeal, Nonliving.  "]                                                                                                      

    
    //Conjurations:
    //Enchantments:
    //Equipment:
    //Incantations:
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
        if (cardAttacks[i][2] === Melee || cardAttacks[i][2] === Ranged || cardAttacks[i][2] === Zone || cardAttacks[i][2] === Trample) {
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
        } else if (cardAttacks[i][2] === NonAttackMelee) {
            text = text + "action type: Melee, "
        } else if (cardAttacks[i][2] === NonAttackRanged) {
            text = text + "action type: Ranged, "
        } else if (cardAttacks[i][2] === NonAttackZone) {
            text = text + "action type: Zone, "
        }
        if (!(cardAttacks[i][2] === Melee || cardAttacks[i][2] === Trample || cardAttacks[i][2] === NonAttackMelee)) {
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
    if (cardAttacks[attackIndex][2] === Melee || cardAttacks[attackIndex][2] === Ranged || cardAttacks[attackIndex][2] === Zone || cardAttacks[attackIndex][2] === Trample) {
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
const tempTest = document.getElementById("temptest");
const searchButton = document.getElementById("search-button");
const cardGrid = document.getElementById("cards");
const searchBar = document.getElementById("searchBar");

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
const RangedImage = "Images/Ranged.png";
const ZoneImage = "Images/ZoneAttack.png";
const TrampleImage = "Images/Trample.png";
const DamageBarrierImage = "Images/DamageBarrier.png";

const CastRangeImage = "Images/CastRange.png";
const ManaCostImage = "Images/ManaCost.png";


async function main() {
    searchButton.addEventListener('click', function(){updateCardGrid()});
    updateCardGrid();
}

function updateCardGrid() {
    query = (searchBar.value).toLowerCase();
    tempTest.textContent = query;
    cardGrid.innerHTML = "";
    updateTempTest();
    if (query === "") {
        for (let i = 0; i < cards.length; i++) {
            addCardToGrid(cards[i]);
        }
    } else {
        for (let i = 0; i < cards.length; i++) {
            if (fullText(cards[i]).toLowerCase().includes(query)) {
                addCardToGrid(cards[i]);
            }
        }
    }
}

function addCardToGrid(card) {
    var cardDiv = document.createElement('div');
    //cardDiv.id = 'block';
    if (type(card) === AttackSpell) {
        cardDiv.className = 'cardAttackSpell';
    } else if (type(card) === Creature) {
        cardDiv.className = 'cardCreature';
    } else if (type(card) === Conjuration) {
        cardDiv.className = 'cardConjuration';
    } else if (type(card) === Enchantment) {
        cardDiv.className = 'cardEnchantment';
    } else if (type(card) === Equipment) {
        cardDiv.className = 'cardEquipment';
    } else if (type(card) === Incantation) {
        cardDiv.className = 'cardIncantation';
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
                var defenseTextDiv = document.createElement('div');
                defenseTextDiv.className = "defenseText";
                defenseTextDiv.textContent = (currentDefense[0] + "+");
                defenseDiv.appendChild(defenseTextDiv);
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
            if (currentAttack[2] === Melee || currentAttack[2] === Ranged || currentAttack[2] === NonAttackRanged || currentAttack[2] === Zone || currentAttack[2] === Trample || currentAttack[2] === DamageBarrier) {
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
                attackTextDiv.textContent = currentAttack[11];
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