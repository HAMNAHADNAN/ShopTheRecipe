-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 16, 2025 at 10:38 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shoptherecipe`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ingredient_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `ingredient_id`, `quantity`, `created_at`) VALUES
(15, 10, 19, 1, '2025-04-22 20:50:19'),
(16, 10, 20, 1, '2025-04-22 20:50:19'),
(17, 10, 21, 3, '2025-04-22 20:50:19'),
(19, 10, 23, 1, '2025-04-22 20:50:19'),
(20, 10, 15, 4, '2025-04-22 20:50:35'),
(175, 12, 7, 1, '2025-05-11 10:48:17'),
(176, 12, 8, 1, '2025-05-11 10:48:17'),
(177, 12, 9, 1, '2025-05-11 10:48:17'),
(178, 12, 14, 1, '2025-05-11 10:48:17'),
(179, 12, 26, 1, '2025-05-11 10:48:17'),
(180, 12, 37, 1, '2025-05-11 10:48:17'),
(181, 12, 38, 1, '2025-05-11 10:48:17'),
(182, 12, 39, 1, '2025-05-11 10:48:17'),
(183, 12, 40, 1, '2025-05-11 10:48:17'),
(184, 12, 41, 1, '2025-05-11 10:48:17'),
(185, 12, 42, 1, '2025-05-11 10:48:17'),
(186, 12, 43, 1, '2025-05-11 10:48:17'),
(187, 12, 44, 1, '2025-05-11 10:48:17'),
(188, 12, 45, 1, '2025-05-11 10:48:17'),
(189, 12, 46, 1, '2025-05-11 10:48:17'),
(190, 12, 47, 1, '2025-05-11 10:48:17'),
(191, 12, 48, 1, '2025-05-11 10:48:17'),
(192, 12, 49, 1, '2025-05-11 10:48:17'),
(193, 12, 50, 1, '2025-05-11 10:48:17'),
(194, 12, 51, 1, '2025-05-11 10:48:17'),
(371, 7, 1, 1, '2025-05-16 20:26:13'),
(372, 7, 2, 1, '2025-05-16 20:26:13'),
(373, 7, 3, 1, '2025-05-16 20:26:13'),
(374, 7, 4, 1, '2025-05-16 20:26:14'),
(375, 7, 5, 1, '2025-05-16 20:26:14'),
(376, 7, 6, 1, '2025-05-16 20:26:14'),
(377, 7, 7, 1, '2025-05-16 20:26:14'),
(378, 7, 8, 1, '2025-05-16 20:26:14'),
(379, 7, 9, 1, '2025-05-16 20:26:14'),
(380, 7, 10, 1, '2025-05-16 20:26:14'),
(381, 7, 11, 1, '2025-05-16 20:26:14'),
(382, 7, 12, 1, '2025-05-16 20:26:14'),
(383, 7, 13, 1, '2025-05-16 20:26:14'),
(384, 7, 14, 1, '2025-05-16 20:26:14'),
(385, 7, 15, 1, '2025-05-16 20:26:14'),
(386, 7, 16, 1, '2025-05-16 20:26:14'),
(387, 7, 17, 1, '2025-05-16 20:26:14'),
(388, 7, 18, 1, '2025-05-16 20:26:14');

-- --------------------------------------------------------

--
-- Table structure for table `contact_form_submissions`
--

CREATE TABLE `contact_form_submissions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `contact_form_submissions`
--

INSERT INTO `contact_form_submissions` (`id`, `name`, `email`, `category`, `message`, `submitted_at`) VALUES
(1, 'Diya Fatima', 'lilanidiya@gmail.com', 'General', '	\"I would like to inquire about  the the various products offered on your site, especially the new arrivals and discounts.\"', '2025-04-17 14:25:13'),
(2, 'Diya Fatima', 'lilanidiya@gmail.com', 'Feedback', '	\"I think the website navigation can be improved. It would be great if you could add a search bar for faster browsing.\"', '2025-04-17 14:28:47'),
(3, 'Diya Fatima', 'lilanidiya@gmail.com', 'Support', '	\"I am having trouble logging into my account. Can you please assist me in resetting my password or resolving this issue?\"', '2025-04-17 14:32:12'),
(4, 'Mohammad John', 'm.johnkamil@gmail.com', 'Complaint', '\"I recently received a damaged item from my order and would like to know how I can return or exchange it for a new one.\"', '2025-04-17 14:32:25'),
(5, 'Diya Fatima', 'fatima4503167@cloud.neduet.edu.pk', 'Inquiry', '	\"I am looking for more details on your shipping policies and would like to know if you ship internationally.\"', '2025-04-22 20:50:05');

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`, `unit`, `price`, `quantity`) VALUES
(1, 'Peanut oil', 'ml', 4.00, 993),
(2, 'Shallot', 'piece', 0.25, 998),
(3, 'White onion', 'piece', 0.30, 996),
(4, 'Butter', 'g', 0.75, 991),
(5, 'Ginger garlic paste', 'tbsp', 1.20, 996),
(6, 'Lemon juice', 'tbsp', 0.20, 996),
(7, 'Garam masala', 'tsp', 0.50, 985),
(8, 'Chili powder', 'tsp', 0.60, 970),
(9, 'Ground cumin', 'tsp', 0.40, 988),
(10, 'Bay leaf', 'piece', 0.05, 983),
(11, 'Tomato puree', 'ml', 1.50, 998),
(12, 'Half-and-half', 'ml', 2.00, 998),
(13, 'Plain yogurt', 'ml', 1.50, 997),
(14, 'Salt and ground black pepper', 'pinch', 0.05, 984),
(15, 'Boneless skinless chicken thighs', 'g', 4.50, 997),
(16, 'Cayenne pepper', 'tsp', 0.40, 994),
(17, 'Cornstarch', 'tbsp', 0.20, 993),
(18, 'Water', 'ml', 0.01, 989),
(19, 'Cooking spray', 'can', 2.50, 994),
(20, 'Ground turkey', 'pound', 4.00, 994),
(21, 'Frozen chopped spinach', 'box (10 ounces)', 2.50, 994),
(22, 'Feta cheese', 'ounce', 1.50, 994),
(23, 'Eggs', 'each', 0.30, 999),
(24, 'Garlic', 'cloves', 0.10, 979),
(25, 'Ghee (clarified butter)', 'tablespoon', 1.50, 995),
(26, 'Onion', 'each', 0.30, 987),
(27, 'Ground ginger', 'teaspoon', 0.50, 996),
(28, 'Ground cinnamon', 'teaspoon', 0.80, 998),
(29, 'Ground turmeric', 'teaspoon', 0.75, 989),
(30, 'Tomato sauce', 'can (14 ounces)', 0.15, 997),
(31, 'Heavy whipping cream', 'cup', 1.00, 998),
(32, 'White sugar', 'tablespoon', 2.50, 998),
(33, 'Paprika', 'teaspoon', 0.20, 996),
(34, 'Vegetable oil', 'tablespoon', 0.50, 987),
(35, 'Chicken breast (skinless, boneless)', 'pound', 0.30, 996),
(36, 'Curry powder', 'teaspoon', 5.00, 998),
(37, 'Tenderloin', 'pounds', 0.70, 1000),
(38, 'Avocado oil', 'cup', 7.00, 1000),
(39, 'Kiwi', 'piece', 3.50, 842),
(40, 'Gram flour', 'tablespoon', 1.00, 1000),
(41, 'Poppy seeds', 'tablespoon', 0.30, 1000),
(42, 'Garlic paste', 'tablespoon', 0.50, 1000),
(43, 'Ginger paste', 'tablespoon', 0.80, 1000),
(44, 'Serrano chile pepper', 'piece', 0.90, 1000),
(45, 'Mustard oil', 'cup', 0.60, 1000),
(46, 'White vinegar', 'tablespoon', 1.50, 1000),
(47, 'Plain full fat yogurt', 'cup', 1.00, 1000),
(48, 'Nutmeg seed', 'piece', 1.80, 1000),
(49, 'Mace', 'tablespoon', 0.70, 1000),
(50, 'Star anise pods', 'pod', 1.00, 1000),
(51, 'Dried red Kashmiri chilies', 'piece', 0.80, 1000),
(52, 'Fresh ginger', 'piece', 0.50, 993),
(53, 'Fresh cilantro leaves', 'bunch', 1.00, 989),
(54, 'Chickpeas (canned)', 'can (15 ounces)', 1.20, 993),
(55, 'Tomato', 'piece', 1.50, 978),
(56, 'Green chili pepper', 'piece', 0.50, 979),
(57, 'Coriander Powder', 'teaspoon', 0.40, 992),
(58, 'Ground Beef', '1', 0.50, 997),
(59, 'Frozen Peas', 'g', 1.80, 946),
(60, 'Masala Curry Powder', 'tbsp', 2.50, 998),
(61, 'Flaked Coconut', 'g', 0.30, 998),
(62, 'Ground Black Pepper', 'g', 0.40, 998),
(65, 'Ginger', 'g', 0.50, 998),
(66, 'Plain Yougurt', 'g', 1.50, 1000),
(67, 'Mint Leaves', 'g', 1.00, 998),
(68, 'Cardmom ', 'g', 1.50, 998),
(69, 'Cinnamon Sticks', 'sticks', 3.00, 998),
(70, 'Rice', 'kg', 2.00, 998),
(71, 'Cloves', 'g', 0.25, 998),
(72, 'Saffron', 'g', 10.00, 998),
(73, 'Soy Saucer', 'ml', 1.50, 996),
(74, 'Hoisin Sauce', 'g', 0.40, 998),
(75, 'Toasted Sesame Oil', 'g', 0.40, 998),
(76, 'Sirracha Sauce', 'g', 0.40, 998),
(77, 'Brown Sugar', 'g', 0.75, 998),
(78, 'Whole Grain Sphaggeti', 'g', 1.00, 998),
(79, 'Bella Mushroom', 'g', 3.00, 998),
(80, 'Carrot', 'g', 0.50, 961),
(81, 'Red Ball Pepper', 'g', 1.00, 998),
(82, 'lasagna noodles', 'g', 3.00, 999),
(83, 'whole milk mozzarella cheese', 'g', 4.00, 999),
(84, 'condensed cream of mushroom soup', 'ml', 1.50, 999),
(85, 'milk', 'l', 1.50, 999),
(86, 'shredded cheddar cheese', 'g', 3.00, 999),
(87, 'Potates', 'kg', 1.00, 997),
(88, 'Salt', 'pack', 0.10, 933),
(89, 'test', 'ml', 0.30, 1000);

-- --------------------------------------------------------

--
-- Table structure for table `instructions`
--

CREATE TABLE `instructions` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `step_number` int(11) DEFAULT NULL,
  `instruction` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `instructions`
--

INSERT INTO `instructions` (`id`, `recipe_id`, `step_number`, `instruction`) VALUES
(1, 1, 1, 'Heat 1 tablespoon oil in a large saucepan over medium-high heat. Sauté shallot and onion until soft and translucent, about 5 minutes.'),
(2, 1, 2, 'Stir in butter, ginger-garlic paste, lemon juice, 1 teaspoon garam masala, chili powder, cumin, and bay leaf. Cook and stir for 1 minute. Add tomato sauce, and cook for 2 minutes, continuing to frequently stir.'),
(3, 1, 3, 'Stir in half-and-half and yogurt. Reduce heat to low, and simmer for 10 minutes, frequently stirring. Season with salt and pepper. Remove from heat and set aside.'),
(4, 1, 4, 'Heat remaining 1 tablespoon oil in a large heavy skillet over medium heat. Cook chicken until lightly browned, about 10 minutes.'),
(5, 1, 5, 'Reduce heat, and season with remaining 1 teaspoon garam masala and cayenne. Stir in a few spoonfuls of sauce, and simmer until liquid has reduced, and chicken is no longer pink. Add cooked chicken into sauce and stir together.'),
(6, 1, 6, 'Dissolve cornstarch into water, then mix into the sauce. Cook for 5 to 10 minutes, or until thickened.'),
(7, 1, 7, 'Serve over rice with naan.'),
(8, 2, 1, 'Preheat an outdoor grill for medium-high heat and lightly oil the grate.'),
(9, 2, 2, 'Mix together turkey, spinach, feta, eggs, and garlic in a large bowl until well combined'),
(10, 2, 3, 'form into 8 patties.Cook patties on the preheated grill on both sides until no longer pink in the center, 15 to 20 minutes..'),
(11, 2, 4, ' An instant-read thermometer inserted into the center of patties should read at least 165 degrees F (74 degrees C)'),
(12, 3, 1, 'Gather all ingredients.\\nHeat ghee in a large skillet over medium heat. '),
(13, 3, 2, 'Add onion; cook and stir until translucent, about 5 minutes. '),
(14, 3, 3, '\nStir in garlic; cook and stir just until fragrant, about 1 minute. Stir cumin, 1 teaspoon salt, ginger, cayenne pepper, cinnamon, and turmeric into onion mixture; fry until fragrant, about 2 minutes. '),
(15, 3, 4, '\nStir tomato sauce into onion and spice mixture; bring to a boil and reduce heat to low.\nSimmer sauce for 10 minutes, then mix in cream, 1 tablespoon sugar, and paprika. Bring sauce back to a simmer and cook, stirring often, until sauce is thickened, 10 to 15 minutes. '),
(16, 3, 5, '\nHeat vegetable oil in a separate skillet over medium heat. Stir chicken into hot oil; add curry powder. Sear chicken until lightly browned but still pink inside, about 3 minutes; stir often. '),
(17, 3, 6, 'Transfer chicken and any pan juices into sauce. Simmer chicken in sauce until no longer pink, about 30 minutes; adjust sugar and salt to taste. '),
(18, 4, 1, 'Pound tenderloin strips with a meat mallet until they are very thin; set aside.\r\n      '),
(20, 4, 2, 'Heat avocado oil in a frying pan over medium heat. Fry onion in the hot oil until it is a deep brown, about 5 minutes. Strain browned onion into a small bowl using a slotted spoon, and set aside to use later.   '),
(21, 4, 3, ' Peel kiwi, cut into quarters, and set aside in a small bowl for later.   '),
(22, 4, 4, 'Heat a small non-stick skillet over medium heat, and toast gram flour until lightly browned and nutty, 2 to 4 minutes; transfer to a small bowl and set aside. Dry-roast poppy seeds in the same skillet until lightly brown and aromatic, 2 to 4 minutes. Remove to a small bowl; set aside.  '),
(23, 4, 5, 'In the same skillet, dry-roast nutmeg, mace, star anise, and Kashmiri chilies together until fragrant, 2 to 4 minutes. Transfer the whole spices and chilies to a spice grinder, and grind them to a coarse powder.'),
(24, 4, 6, 'Add browned onions, kiwi, ginger paste, garlic paste, and serrano chile to the bowl of a food processor, and grind to a paste, about 30 seconds. Pour in mustard oil, white vinegar, and yogurt and pulse the food processor until everything is well blended, about 15 seconds.   '),
(25, 4, 7, 'Last of all, add roasted poppy seeds, roasted gram flour, roasted ground whole spices, chili powder, cumin, garam masala, black pepper, and salt to the food processor; process marinade for 1 minute. '),
(26, 4, 8, 'Spoon marinade into a resealable plastic bag and add tenderized beef strips. Seal bag and squeeze gently to coat beef on all sides with marinade. Refrigerate for at least 6 hours, but ideally overnight. '),
(27, 4, 9, 'Remove marinated beef from the refrigerator; thread beef strips on sturdy metal skewers, packing them in tightly. Reserve any leftover marinade to baste the kababs with as they cook. This prevents them from drying out. '),
(28, 4, 10, 'Heat avocado oil in a frying pan over medium heat. Fry onion in the hot oil until it is a deep brown, about 5 minutes. Strain browned onion into a small bowl using a slotted spoon, and set aside to use later.   '),
(29, 4, 11, 'Preheat an outdoor grill to 500 degrees F (260 degrees C) and lightly oil the grate.'),
(30, 4, 12, 'Grill kababs on the preheated grill, uncovered, for 5 minutes per side.\r\n         '),
(31, 4, 13, 'Reduce grill temperature to 350 degrees F (175 degrees C), cover the grill, and cook kababs for 10 minutes. Turn kebabs, brush with marinade, and continue cooking until the internal temperature of the meat reaches 170 degrees F (77 degrees C), about 10 minutes more. If kababs look a bit dry at any point in the cooking process, brush both sides with a little bit of avocado oil.'),
(32, 4, 14, 'Remove skewers to a serving dish. Discard any uncooked marinade. Enjoy the kababs with naan, sliced red onions, tamarind chutney, and green chutney. '),
(34, 5, 1, 'Grind onion, tomato, ginger, garlic, and chile pepper together in a food processor into a paste. '),
(35, 5, 2, 'Heat olive oil in a large skillet over medium heat. Fry bay leaves in hot oil until fragrant, about 30 seconds. Pour the paste into the skillet and cook until the oil begins to separate from the mixture and is golden brown in color, 2 to 3 minutes. Season the mixture with chili powder, coriander, gram masala, turmeric, and salt; cook and stir until very hot, 2 to 3 minutes.'),
(36, 5, 3, 'Stir just enough water into the mixture to get a thick sauce; bring to a boil and stir chickpeas into the sauce. Reduce heat to medium and cook until the chickpeas are heated through, 5 to 7 minutes. Garnish with cilantro.     '),
(37, 6, 1, 'Melt butter in a skillet over medium heat. Add onion and garlic; cook and stir until onion is translucent, 3 to 5 minutes. Stir in beef; cook until crumbly and no longer pink, 5 to 10 minutes. Drain excess fat.'),
(38, 6, 2, 'Stir tomatoes, peas, curry powder, salt, paprika, chili powder, and pepper into beef mixture; cook until thickened, about 20 minutes. Garnish with coconut .'),
(40, 7, 1, ' Gather all ingredients..'),
(41, 7, 2, 'Heat 2 tablespoons of oil in a large skillet. Fry potatoes in hot oil until lightly browned, about 3 to 5 minutes. Remove to a paper towel-lined plate to drain; set aside.'),
(42, 7, 3, 'Add remaining 2 tablespoons of oil to the skillet. Add onions, garlic, and fresh ginger; cook and stir until onion is soft and golden. Add tomatoes, salt, cumin, chili powder, pepper, and turmeric; cook, stirring constantly, for 5 minutes. '),
(43, 7, 4, 'Stir in yogurt, mint, ground cardamom, and cinnamon stick. Cover and cook over low heat, stirring occasionally, until tomatoes are cooked to a pulp. It may be necessary to add a little hot water if mixture becomes too dry and starts to stick to the pan.'),
(44, 7, 5, 'Add chicken and stir well to coat. Cover and cook over very low heat until chicken is tender, 35 to 45 minutes. There should only be a little very thick gravy left when chicken is finished cooking. If necessary cook uncovered for a few minutes to reduce the gravy.'),
(45, 7, 6, 'Meanwhile, make the rice: Wash rice well and drain in a colander for at least 30 minutes.'),
(46, 7, 7, 'Heat oil in a large skillet. Add onion; cook and stir until golden. Add cardamom pods, cloves, cinnamon stick, ground ginger, and saffron; stir in rice until coated with spices.'),
(47, 7, 8, 'Heat stock and salt in a medium pot until hot; pour over rice and stir well.'),
(48, 7, 9, 'Add chicken mixture and potatoes; stir gently to combine. Bring to a boil.'),
(49, 7, 10, 'Reduce heat to very low, cover with a tight-fitting lid, and steam for 20 minutes without lifting the lid or stirring.'),
(50, 7, 11, 'Spoon biryani onto a warm serving dish'),
(51, 8, 1, ' Whisk soy sauce, hoisin sauce, sesame oil, brown sugar, and Sriracha together in a small bowl until well blended; set aside.'),
(52, 8, 2, 'Bring a large pot of salted water to a boil. Add pasta, stirring occasionally; cook until nearly tender with a bite, 7 to 8 minutes, and drain well.'),
(53, 8, 3, 'Meanwhile, heat vegetable oil over medium-high heat in a large skillet or wok. Add mushrooms, snow peas, red bell pepper, carrot, onion, and garlic. Cook, stirring frequently, until just tender, 4 to 6 minutes.'),
(54, 8, 4, 'Add spaghetti and sauce to the skillet and toss with the veggies until well coated. Simmer for 2 minutes to allow pasta to soak up the flavor, and serve'),
(55, 9, 1, 'Bring a large pot of lightly salted water to a boil. Cook lasanga noodles in the boiling water, stirring occasionally, until tender yet firm to the bite, 10 to 12 minutes.'),
(56, 9, 2, 'Strain noodles and return to the pot. Add tomato sauce and cook on medium heat until sauce is heated through, about 5 minutes.'),
(57, 9, 3, 'Add cheese and stir until cheese is melted. Serve immediately'),
(58, 10, 1, 'Preheat oven to 350 degrees F (175 degrees C).'),
(59, 10, 2, 'Heat a large skillet over medium-high heat. Cook and stir ground beef in the hot skillet until browned and crumbly, 5 to 7 minutes. Drain and discard grease.'),
(60, 10, 3, 'Mix condensed soup, milk, onion, salt, and pepper in a medium bowl until combined. Alternately layer the potatoes, soup mixture, and browned ground beef in a 2-quart baking dish.'),
(61, 10, 4, 'Bake in the preheated oven until potatoes are tender, about 1 to 1 1/2 hours. Top with Cheddar cheese, and continue baking until cheese is melted');

-- --------------------------------------------------------

--
-- Table structure for table `nutrients`
--

CREATE TABLE `nutrients` (
  `id` int(11) NOT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `calories` varchar(50) DEFAULT NULL,
  `carbohydrateContent` varchar(50) DEFAULT NULL,
  `cholesterolContent` varchar(50) DEFAULT NULL,
  `fiberContent` varchar(50) DEFAULT NULL,
  `proteinContent` varchar(50) DEFAULT NULL,
  `saturatedFatContent` varchar(50) DEFAULT NULL,
  `sodiumContent` varchar(50) DEFAULT NULL,
  `sugarContent` varchar(50) DEFAULT NULL,
  `fatContent` varchar(50) DEFAULT NULL,
  `unsaturatedFatContent` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `nutrients`
--

INSERT INTO `nutrients` (`id`, `recipe_id`, `calories`, `carbohydrateContent`, `cholesterolContent`, `fiberContent`, `proteinContent`, `saturatedFatContent`, `sodiumContent`, `sugarContent`, `fatContent`, `unsaturatedFatContent`) VALUES
(1, 1, '408 kcal', '16 g', '107 mg', '2 g', '23 g', '11 g', '523 mg', '5 g', '28 g', '0 g'),
(2, 2, '233 kcal', '2 g', '143 mg', '1 g', '27 g', '5 g', '266 mg', '1 g', '13 g', '0 g'),
(3, 3, '328 kcal', '13 g', '106 mg', '2 g', '18 g', '13 g', '981 mg', '7 g', '23 g', '0 g'),
(4, 4, '835 kcal', '21 g', '122 mg', '5 g', '37 g', '17 g', '772 mg', '9 g', '68 g', '0 g'),
(5, 5, '413 kcal', '46 g', '10 mg', '9 g', '3 g', '525 g', '5 mg', '23 g', '13 g', '0 g'),
(6, 6, '420 kcal', '15 g', '93 mg', '5 g', '23 g', '16 g', '1023 mg', '6 g', '31 g', '0 g'),
(7, 7, '832 kcal', '79 g', '134 mg', '5 g', '48 g', '8 g', '1522 mg', '5 g', '35 g', '0 g'),
(8, 8, '285 kcal', '38 g', '0 mg', '6 g', '10 g', '1 g', '911 mg', '12 g', '11 g', '0 g'),
(9, 9, '203 kcal', '19 g', '30 mg', '3 g', '12 g', '5 g', '818 mg', '9 g', '5 g', '0 g'),
(10, 10, '403 kcal', '17 g', '83 mg', '1 g', '22 g', '12 g', '532 mg', '4 g', '27 g', '0 g');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `shipping_address` text NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total`, `shipping_address`, `order_date`) VALUES
(2, 7, 86.00, '4769 Pine Lane, 2 Orlando, FL 32801, USA', '2025-05-08 04:49:48'),
(3, 7, 86.00, '1123 Oak Street, Dallas, TX 75201, USA', '2025-05-08 19:53:15'),
(4, 7, 316.00, '5612 Cedar Road, New York, NY 10001, USA', '2025-05-08 19:54:28'),
(6, 12, 316.00, '3476 Elm Boulevard, Seattle, WA 98101, USA', '2025-05-11 05:18:50'),
(7, 7, 34.15, '2487 Maple Avenue, Springfield, IL 62704, USA', '2025-05-11 12:31:46'),
(8, 7, 28.00, 'USA Illinoi', '2025-05-11 20:15:16'),
(9, 7, 7.10, 'usa', '2025-05-12 05:54:12'),
(10, 13, 7.96, 'Chicago, USA', '2025-05-13 16:45:03'),
(11, 7, 14.45, 'USA TX', '2025-05-14 06:27:21'),
(12, 7, 28.60, 'USA', '2025-05-14 06:37:12'),
(13, 7, 14.65, 'USA', '2025-05-14 06:46:35'),
(14, 7, 4.15, 'USA', '2025-05-16 18:44:14'),
(15, 7, 1.65, 'USA CHICAGO', '2025-05-16 18:46:19'),
(16, 7, 1.65, 'Chicago', '2025-05-16 18:47:59'),
(17, 7, 1.65, 'Chicago', '2025-05-16 18:48:17'),
(18, 7, 1.65, 'Chicago', '2025-05-16 18:49:40'),
(19, 7, 1.65, 'usa', '2025-05-16 18:50:34'),
(20, 7, 62.20, 'NEW USA', '2025-05-16 19:28:36'),
(21, 7, 7.15, 'USA TEST', '2025-05-16 19:36:47'),
(22, 7, 1.20, 'USA NEW', '2025-05-16 20:24:10');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_id`, `ingredient_id`, `quantity`, `price`) VALUES
(2, 14, 1, 1),
(2, 34, 1, 10),
(3, 5, 1, 10),
(3, 11, 1, 25),
(3, 15, 2, 100),
(3, 52, 5, 50),
(3, 54, 1, 120),
(4, 3, 5, 15),
(4, 4, 1, 30),
(4, 55, 3, 20),
(4, 56, 4, 5),
(4, 57, 3, 20),
(6, 7, 1, 5),
(6, 8, 1, 3),
(6, 10, 1, 2),
(6, 14, 1, 1),
(6, 18, 1, 0),
(6, 24, 1, 10),
(6, 26, 1, 30),
(6, 29, 1, 10),
(6, 34, 1, 10),
(6, 52, 1, 50),
(6, 53, 1, 30),
(6, 54, 1, 120),
(6, 55, 1, 20),
(6, 56, 1, 5),
(6, 57, 1, 20),
(7, 6, 1, 0),
(7, 9, 1, 0),
(7, 14, 2, 0),
(7, 16, 1, 0),
(7, 24, 2, 0),
(7, 25, 1, 2),
(7, 26, 3, 0),
(7, 27, 1, 1),
(7, 28, 1, 1),
(7, 29, 1, 1),
(7, 30, 1, 0),
(7, 31, 1, 1),
(7, 32, 1, 3),
(7, 33, 1, 0),
(7, 34, 2, 1),
(7, 35, 1, 0),
(7, 36, 1, 5),
(7, 58, 1, 1),
(7, 59, 1, 2),
(7, 73, 1, 2),
(7, 74, 1, 0),
(7, 75, 1, 0),
(7, 76, 1, 0),
(7, 77, 1, 1),
(7, 78, 1, 1),
(7, 79, 1, 3),
(7, 80, 1, 1),
(7, 81, 1, 1),
(7, 84, 1, 2),
(7, 85, 1, 2),
(7, 86, 1, 3),
(7, 87, 1, 1),
(8, 8, 4, 1),
(8, 9, 1, 0),
(8, 13, 1, 2),
(8, 24, 1, 0),
(8, 26, 1, 0),
(8, 27, 1, 1),
(8, 29, 1, 1),
(8, 34, 1, 1),
(8, 35, 1, 0),
(8, 55, 1, 2),
(8, 62, 1, 0),
(8, 65, 1, 1),
(8, 67, 1, 1),
(8, 68, 1, 2),
(8, 69, 1, 3),
(8, 70, 1, 2),
(8, 71, 1, 0),
(8, 72, 1, 10),
(8, 87, 1, 1),
(8, 88, 1, 0),
(9, 4, 1, 1),
(9, 8, 1, 1),
(9, 14, 1, 0),
(9, 24, 1, 0),
(9, 26, 1, 0),
(9, 33, 1, 0),
(9, 58, 1, 1),
(9, 59, 1, 2),
(9, 60, 1, 3),
(9, 61, 1, 0),
(10, 7, 1, 1),
(10, 8, 1, 1),
(10, 10, 1, 0),
(10, 14, 1, 0),
(10, 18, 1, 0),
(10, 24, 1, 0),
(10, 26, 1, 0),
(10, 29, 1, 1),
(10, 34, 1, 1),
(10, 52, 1, 1),
(10, 53, 1, 1),
(10, 54, 1, 1),
(10, 55, 1, 2),
(10, 56, 1, 1),
(10, 57, 1, 0),
(11, 9, 1, 0),
(11, 14, 1, 0),
(11, 16, 1, 0),
(11, 24, 1, 0),
(11, 25, 1, 2),
(11, 26, 1, 0),
(11, 27, 1, 1),
(11, 28, 1, 1),
(11, 29, 1, 1),
(11, 30, 1, 0),
(11, 31, 1, 1),
(11, 32, 1, 3),
(11, 33, 1, 0),
(11, 34, 1, 1),
(11, 35, 1, 0),
(11, 36, 1, 5),
(12, 8, 1, 1),
(12, 9, 2, 0),
(12, 12, 1, 2),
(12, 13, 1, 2),
(12, 24, 1, 0),
(12, 26, 1, 0),
(12, 27, 1, 1),
(12, 29, 1, 1),
(12, 34, 1, 1),
(12, 35, 1, 0),
(12, 55, 1, 2),
(12, 62, 1, 0),
(12, 65, 1, 1),
(12, 67, 1, 1),
(12, 68, 1, 2),
(12, 69, 1, 3),
(12, 70, 1, 2),
(12, 71, 1, 0),
(12, 72, 1, 10),
(12, 87, 1, 1),
(12, 88, 1, 0),
(13, 24, 1, 0),
(13, 26, 1, 0),
(13, 34, 1, 1),
(13, 59, 1, 2),
(13, 73, 3, 2),
(13, 74, 1, 0),
(13, 75, 1, 0),
(13, 76, 1, 0),
(13, 77, 1, 1),
(13, 78, 1, 1),
(13, 79, 1, 3),
(13, 80, 1, 1),
(13, 81, 1, 1),
(14, 4, 1, 1),
(14, 5, 1, 1),
(14, 6, 1, 0),
(14, 7, 4, 1),
(15, 8, 2, 1),
(15, 9, 1, 0),
(15, 10, 1, 0),
(16, 8, 2, 1),
(16, 9, 1, 0),
(16, 10, 1, 0),
(17, 8, 2, 1),
(17, 9, 1, 0),
(17, 10, 1, 0),
(18, 8, 2, 1),
(18, 9, 1, 0),
(18, 10, 1, 0),
(19, 8, 2, 1),
(19, 9, 1, 0),
(19, 10, 1, 0),
(20, 4, 1, 1),
(20, 8, 2, 1),
(20, 14, 1, 0),
(20, 19, 5, 3),
(20, 20, 5, 4),
(20, 21, 5, 3),
(20, 22, 5, 2),
(20, 24, 6, 0),
(20, 26, 1, 0),
(20, 33, 1, 0),
(20, 55, 1, 2),
(20, 58, 1, 1),
(20, 59, 1, 2),
(20, 60, 1, 3),
(20, 61, 1, 0),
(21, 30, 1, 0),
(21, 82, 1, 3),
(21, 83, 1, 4),
(22, 5, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `cook_time` int(11) DEFAULT NULL,
  `cuisine` varchar(100) DEFAULT NULL,
  `diet` varchar(50) DEFAULT NULL,
  `difficulty` varchar(50) DEFAULT NULL,
  `instructions` text DEFAULT NULL,
  `language` varchar(10) DEFAULT NULL,
  `prep_time` int(11) DEFAULT NULL,
  `total_time` int(11) DEFAULT NULL,
  `yields` varchar(50) DEFAULT NULL,
  `ratings` float DEFAULT NULL,
  `ratings_count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id`, `title`, `description`, `image_url`, `category`, `cook_time`, `cuisine`, `diet`, `difficulty`, `instructions`, `language`, `prep_time`, `total_time`, `yields`, `ratings`, `ratings_count`) VALUES
(1, 'Chicken Makhani (Indian Butter Chicken)', 'This butter chicken recipe, or chicken makhani, is a favorite Indian dish that features a full-flavored sauce with spices that complement chicken.', 'https://www.allrecipes.com/thmb/Icn_f4w0fMLbRrV78v8bMSkwfhs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/45957-ChickenMakhaniIndianButterChicken-mfs-4X3-0037-7aa9a555bf3943baae20c5c3b0921375.jpg', 'Dinner', 25, 'Indian', 'Non-Vegetarian', 'Medium', 'Heat 1 tablespoon oil in a large saucepan over medium-high heat. Sauté shallot and onion until soft and translucent, about 5 minutes.\r\nStir in butter, ginger-garlic paste, lemon juice, 1 teaspoon garam masala, chili powder, cumin, and bay leaf. Cook and stir for 1 minute. Add tomato sauce, and cook for 2 minutes, continuing to frequently stir.\r\nStir in half-and-half and yogurt. Reduce heat to low, and simmer for 10 minutes, frequently stirring. Season with salt and pepper. Remove from heat and set aside.\r\nHeat remaining 1 tablespoon oil in a large heavy skillet over medium heat. Cook chicken until lightly browned, about 10 minutes.\r\nReduce heat, and season with remaining 1 teaspoon garam masala and cayenne. Stir in a few spoonfuls of sauce, and simmer until liquid has reduced, and chicken is no longer pink. Add cooked chicken into sauce and stir together.\r\nDissolve cornstarch into water, then mix into the sauce. Cook for 5 to 10 minutes, or until thickened.\r\nServe over rice with naan.', 'en', 10, 35, '4 servings', 4.5, 1386),
(2, 'Spinach and Feta Turkey Burgers', 'These spinach and feta turkey burgers are moist and easy to make in one bowl with simple ingredients, shaped into patties, and cooked on a hot grill.', 'https://www.allrecipes.com/thmb/cpf6Rics5oHGq1TZ1df5fEaImwM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1360550-582be362ee99424bb4f363c2274a9d0d.jpg', 'Dinner', 15, 'Mediterranean Inspired', 'Non-Vegetarian', 'Hard', 'Preheat an outdoor grill for medium-high heat and lightly oil the grate.\r\nMix together turkey, spinach, feta, eggs, and garlic in a large bowl until well combined; form into 8 patties.\r\nCook patties on the preheated grill on both sides until no longer pink in the center, 15 to 20 minutes. An instant-read thermometer inserted into the center of patties should read at least 165 degrees F (74 degrees C).', 'en', 20, 35, '8 servings', 4.6, 857),
(3, 'Curry Stand Chicken Tikka Masala Sauce', 'This tikka masala sauce is bright orange and richly flavored with onion, garlic, spices, tomato sauce, and cream, cooked with tender chicken chunks.', 'https://www.allrecipes.com/thmb/9LqKb422Wu6svwa8jt-lnLnERKY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-228293-curry-stand-chicken-tikka-masala-sauce-DDMFS-4x3-4917c70633354b8784b14bae8c3a22a5.jpg', 'Dinner', 65, 'Indian Inspired', 'Non-Vegetarian', 'Easy', 'Gather all ingredients.\r\nHeat ghee in a large skillet over medium heat. Add onion; cook and stir until translucent, about 5 minutes.\r\nStir in garlic; cook and stir just until fragrant, about 1 minute. Stir cumin, 1 teaspoon salt, ginger, cayenne pepper, cinnamon, and turmeric into onion mixture; fry until fragrant, about 2 minutes.\r\nStir tomato sauce into onion and spice mixture; bring to a boil and reduce heat to low.\r\nSimmer sauce for 10 minutes, then mix in cream, 1 tablespoon sugar, and paprika. Bring sauce back to a simmer and cook, stirring often, until sauce is thickened, 10 to 15 minutes.\r\nHeat vegetable oil in a separate skillet over medium heat. Stir chicken into hot oil; add curry powder. Sear chicken until lightly browned but still pink inside, about 3 minutes; stir often.\r\nTransfer chicken and any pan juices into sauce. Simmer chicken in sauce until no longer pink, about 30 minutes; adjust sugar and salt to taste.', 'en', 15, 80, '6 servings', 4.9, 2388),
(4, 'Bihari Kabab', 'These uniquely tender, aromatic, and smoky Bihari kababs are reminiscent of a childhood in Pakistan. Try this ancient recipe today–you won\'t regret it!', 'https://www.allrecipes.com/thmb/BXDgPJ4XIVzs2l4cVW7KaaYqqzo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bihari-kabab-recipe-7509081thedailygourmet4x3-224c1b6ddf3b48b0a803dbb877e524ba.jpg', 'Dinner,Entree', 30, 'Indian', 'Non-Vegetarian', 'Medium', 'Pound tenderloin strips with a meat mallet until they are very thin; set aside.\r\nHeat avocado oil in a frying pan over medium heat. Fry onion in the hot oil until it is a deep brown, about 5 minutes. Strain browned onion into a small bowl using a slotted spoon, and set aside to use later.\r\nPeel kiwi, cut into quarters, and set aside in a small bowl for later.\r\nHeat a small non-stick skillet over medium heat, and toast gram flour until lightly browned and nutty, 2 to 4 minutes; transfer to a small bowl and set aside. Dry-roast poppy seeds in the same skillet until lightly brown and aromatic, 2 to 4 minutes. Remove to a small bowl; set aside.\r\nIn the same skillet, dry-roast nutmeg, mace, star anise, and Kashmiri chilies together until fragrant, 2 to 4 minutes. Transfer the whole spices and chilies to a spice grinder, and grind them to a coarse powder.\r\nAdd browned onions, kiwi, ginger paste, garlic paste, and serrano chile to the bowl of a food processor, and grind to a paste, about 30 seconds. Pour in mustard oil, white vinegar, and yogurt and pulse the food processor until everything is well blended, about 15 seconds.\r\nLast of all, add roasted poppy seeds, roasted gram flour, roasted ground whole spices, chili powder, cumin, garam masala, black pepper, and salt to the food processor; process marinade for 1 minute.\r\nSpoon marinade into a resealable plastic bag and add tenderized beef strips. Seal bag and squeeze gently to coat beef on all sides with marinade. Refrigerate for at least 6 hours, but ideally overnight.\r\nRemove marinated beef from the refrigerator; thread beef strips on sturdy metal skewers, packing them in tightly. Reserve any leftover marinade to baste the kababs with as they cook. This prevents them from drying out.\r\nPreheat an outdoor grill to 500 degrees F (260 degrees C) and lightly oil the grate.\r\nGrill kababs on the preheated grill, uncovered, for 5 minutes per side.\r\nReduce grill temperature to 350 degrees F (175 degrees C), cover the grill, and cook kababs for 10 minutes. Turn kebabs, brush with marinade, and continue cooking until the internal temperature of the meat reaches 170 degrees F (77 degrees C), about 10 minutes more. If kababs look a bit dry at any point in the cooking process, brush both sides with a little bit of avocado oil.\r\nRemove skewers to a serving dish. Discard any uncooked marinade. Enjoy the kababs with naan, sliced red onions, tamarind chutney, and green chutney.', 'en', 30, 60, '4 servings', 5, 3),
(5, 'Chana Masala (Indian Chickpea Curry)', 'Chana masala is easy to make with chickpeas, tomatoes, onion, green chile, ginger, and a flavorsome blend of spices for a delicious Indian curry.', 'https://www.allrecipes.com/thmb/siVGrqeV5Q7xvRGaWWA_5ph9Dds=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/236564-chana-masala-savory-indian-chick-peas-3x4-672-copy-63ae3db5114644419c313cd0e479c9dd.jpg', 'Dinner', 15, 'Indian', 'Non-Vegetarian', 'Easy', 'Grind onion, tomato, ginger, garlic, and chile pepper together in a food processor into a paste.\r\nHeat olive oil in a large skillet over medium heat. Fry bay leaves in hot oil until fragrant, about 30 seconds. Pour the paste into the skillet and cook until the oil begins to separate from the mixture and is golden brown in color, 2 to 3 minutes. Season the mixture with chili powder, coriander, gram masala, turmeric, and salt; cook and stir until very hot, 2 to 3 minutes.\r\nStir just enough water into the mixture to get a thick sauce; bring to a boil and stir chickpeas into the sauce. Reduce heat to medium and cook until the chickpeas are heated through, 5 to 7 minutes. Garnish with cilantro.', 'en', 15, 30, '2 servings', 4.6, 214),
(6, 'Kima (Ground Beef and Peas)', 'Kima is a South Asian dish of ground beef, spices, and peas that is a delicious and quick meal when served with rice. Use ground beef or lamb for an equally tasty result.', 'https://www.allrecipes.com/thmb/2dNKbFvlvKaFyZMuDz2Nnq6oM9Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/3349573-93d3a0e74d9c4cbb8f0723c6b0a7e510.jpg', 'Dinner', 30, 'East And Southeast Asian', 'Non-Vegetarian', 'Medium', 'Melt butter in a skillet over medium heat. Add onion and garlic; cook and stir until onion is translucent, 3 to 5 minutes. Stir in beef; cook until crumbly and no longer pink, 5 to 10 minutes. Drain excess fat.\r\nStir tomatoes, peas, curry powder, salt, paprika, chili powder, and pepper into beef mixture; cook until thickened, about 20 minutes. Garnish with coconut.', 'en', 10, 40, '4 servings', 4.7, 26),
(7, 'Chicken Biryani', 'Chicken biryani is a traditional South Asian rice dish with tender chunks of chicken in a creamy, spicy blend of onion, garlic, tomatoes, and spices.', 'https://www.allrecipes.com/thmb/nJkbnPUIiUxOSGAZgNrs7k6K8qI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/RM_16102_ChickenBiryani_ddmfs_3x4_5315-236dfbbc7965498cac20b87797841b69.jpg', 'Dinner', 80, 'Pakistani', 'Non-Vegetarian', 'Hard', 'Gather all ingredients.\r\nHeat 2 tablespoons of oil in a large skillet. Fry potatoes in hot oil until lightly browned, about 3 to 5 minutes. Remove to a paper towel-lined plate to drain; set aside.\r\nAdd remaining 2 tablespoons of oil to the skillet. Add onions, garlic, and fresh ginger; cook and stir until onion is soft and golden. Add tomatoes, salt, cumin, chili powder, pepper, and turmeric; cook, stirring constantly, for 5 minutes.\r\nStir in yogurt, mint, ground cardamom, and cinnamon stick. Cover and cook over low heat, stirring occasionally, until tomatoes are cooked to a pulp. It may be necessary to add a little hot water if mixture becomes too dry and starts to stick to the pan.\r\nAdd chicken and stir well to coat. Cover and cook over very low heat until chicken is tender, 35 to 45 minutes. There should only be a little very thick gravy left when chicken is finished cooking. If necessary cook uncovered for a few minutes to reduce the gravy.\r\nMeanwhile, make the rice: Wash rice well and drain in a colander for at least 30 minutes.\r\nHeat oil in a large skillet. Add onion; cook and stir until golden. Add cardamom pods, cloves, cinnamon stick, ground ginger, and saffron; stir in rice until coated with spices.\r\nHeat stock and salt in a medium pot until hot; pour over rice and stir well.\r\nAdd chicken mixture and potatoes; stir gently to combine. Bring to a boil.\r\nReduce heat to very low, cover with a tight-fitting lid, and steam for 20 minutes without lifting the lid or stirring.\r\nSpoon biryani onto a warm serving dish.', 'en', 30, 110, '6 servings', 4.3, 162),
(8, 'Veggie Lo Mein', 'This veggie lo mein is a budget-friendly combination of pasta, healthy veggies, and a slightly spicy-sweet sauce for a satisfying quick-and-easy meal.', 'https://www.allrecipes.com/thmb/BxdwMygW_u-avdPs3dIqZskkPJg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8620468_Veggie-Lo-Mein_Pat-Bernitt_4x3-81ca9a7653fb4536a0da018ea024f311.jpg', 'Dinner,Entree', 15, 'Asian', 'Vegetarian', 'Easy', 'Whisk soy sauce, hoisin sauce, sesame oil, brown sugar, and Sriracha together in a small bowl until well blended; set aside.\r\nBring a large pot of salted water to a boil. Add pasta, stirring occasionally; cook until nearly tender with a bite, 7 to 8 minutes, and drain well.\r\nMeanwhile, heat vegetable oil over medium-high heat in a large skillet or wok. Add mushrooms, snow peas, red bell pepper, carrot, onion, and garlic. Cook, stirring frequently, until just tender, 4 to 6 minutes.\r\nAdd spaghetti and sauce to the skillet and toss with the veggies until well coated. Simmer for 2 minutes to allow pasta to soak up the flavor, and serve.', 'en', 15, 30, '4 servings', 4.9, 8),
(9, 'Cheesy Lasagna Sheet Pasta', 'This 3 ingredient cheesy lasagna sheet pasta could not be easier. Serve topped with Parmesan cheese, red pepper flakes, and freshly cracked black pepper if you like.', 'https://www.allrecipes.com/thmb/o2wivYYYV3Mj8eSeJ_xinGpWhF0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/CheesyLasagnaSheets4x3-3d829e4980ae4229920acc127920cef4.jpg', 'Dinner', 15, 'Italian', 'Vegetarian', 'Easy', 'Bring a large pot of lightly salted water to a boil. Cook lasanga noodles in the boiling water, stirring occasionally, until tender yet firm to the bite, 10 to 12 minutes.\r\nStrain noodles and return to the pot. Add tomato sauce and cook on medium heat until sauce is heated through, about 5 minutes.\r\nAdd cheese and stir until cheese is melted. Serve immediately.', 'en', 5, 20, '6 servings', 4, 2),
(10, 'Hamburger Potato Casserole', 'Hamburger potato casserole is an oldie but a goodie! This recipe layers ground beef and potatoes with mushroom soup, onion, and Cheddar cheese.', 'https://www.allrecipes.com/thmb/ZvuLhaicsIjPAP9AAqSx_g00EQg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/26609hamburger-potato-casseroleFranceC4x3-33340bf002904e539e58de2d6593d925.jpg', 'Dinner', 80, 'American', 'Non-Vegetarian', 'Medium', 'Preheat oven to 350 degrees F (175 degrees C).\r\nHeat a large skillet over medium-high heat. Cook and stir ground beef in the hot skillet until browned and crumbly, 5 to 7 minutes. Drain and discard grease.\r\nMix condensed soup, milk, onion, salt, and pepper in a medium bowl until combined. Alternately layer the potatoes, soup mixture, and browned ground beef in a 2-quart baking dish.\r\nBake in the preheated oven until potatoes are tender, about 1 to 1 1/2 hours. Top with Cheddar cheese, and continue baking until cheese is melted.', 'en', 20, 100, '6 servings', 4.4, 1567),
(11, 'Spicy Chickpea Curry', 'A flavorful and protein-packed vegan curry made with chickpeas, tomatoes, and aromatic spices.', 'https://www.mediterraneanliving.com/wp-content/uploads/2013/12/Crunchy-Spicy-Chickpeas.jpg', 'Dinner', 30, 'Mediterranean Inspired', 'Vegan', 'Medium', 'Heat oil in a pan. Add chopped onions, garlic, and ginger. Sauté until golden. Add spices, tomatoes, and cook till soft. Add chickpeas and water. Simmer for 20 minutes. Garnish with cilantro and serve with rice or naan.', 'en', 15, 45, '4 servings', 4.7, 129);

-- --------------------------------------------------------

--
-- Table structure for table `recipe_ingredients`
--

CREATE TABLE `recipe_ingredients` (
  `recipe_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `quantity` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `recipe_ingredients`
--

INSERT INTO `recipe_ingredients` (`recipe_id`, `ingredient_id`, `quantity`) VALUES
(1, 1, '50 ml'),
(1, 2, '20 g'),
(1, 3, '15 g'),
(1, 4, '30 g'),
(1, 5, '10 tbsp'),
(1, 6, '8 tbsp'),
(1, 7, '5 tsp'),
(1, 8, '3 tsp'),
(1, 9, '4 tsp'),
(1, 10, '2 pieces'),
(1, 11, '25 ml'),
(1, 12, '40 ml'),
(1, 13, '12 ml'),
(1, 14, 'pinch'),
(1, 15, '100 g'),
(1, 16, '5 tsp'),
(1, 17, '6 tbsp'),
(1, 18, '1/4 ml'),
(2, 19, '150.00 ml'),
(2, 20, '700.00 g'),
(2, 21, '100.00 g'),
(2, 22, '200.00 g'),
(2, 23, '2.00 each'),
(2, 24, '10.00 g'),
(3, 9, '1 tablespoon'),
(3, 14, '1 teaspoon'),
(3, 16, '1 teaspoon'),
(3, 24, '4 cloves'),
(3, 25, '2 tablespoons'),
(3, 26, '1, finely chopped'),
(3, 27, '1 teaspoon'),
(3, 28, '½ teaspoon'),
(3, 29, '¼ teaspoon'),
(3, 30, '1 (14 ounce) can'),
(3, 31, '1 cup'),
(3, 32, '1 tablespoon'),
(3, 33, '2 teaspoons'),
(3, 34, '1 tablespoon'),
(3, 35, '4 skinless, boneless chicken breast halves'),
(3, 36, '½ teaspoon'),
(4, 7, '1 teaspoon'),
(4, 8, '1 teaspoon'),
(4, 9, '1 teaspoon'),
(4, 14, '1 teaspoon'),
(4, 26, '1/2, thinly sliced'),
(4, 37, '1 1/4 pounds'),
(4, 38, '1/4 cup'),
(4, 39, '1, peeled and quartered'),
(4, 40, '1 1/2 tablespoons'),
(4, 41, '1/2 tablespoon'),
(4, 42, '1 tablespoon'),
(4, 43, '1 tablespoon'),
(4, 44, '1 small'),
(4, 45, '1/4 cup'),
(4, 46, '2 tablespoons'),
(4, 47, '1/4 cup'),
(4, 48, '1/2'),
(4, 49, '1 tablespoon'),
(4, 50, '5 pods'),
(4, 51, '5 whole'),
(5, 7, '1 teaspoon'),
(5, 8, '1 teaspoon'),
(5, 10, '2 pieces'),
(5, 14, '1 pinch'),
(5, 18, 'as needed'),
(5, 24, '4 cloves'),
(5, 26, '1 piece'),
(5, 29, '1/2 teaspoon'),
(5, 34, '3 tablespoons'),
(5, 52, '1 piece'),
(5, 53, '1 teaspoon'),
(5, 54, '1 can (15 ounce)'),
(5, 55, '1 piece'),
(5, 56, '1 piece'),
(5, 57, '1 teaspoon'),
(6, 4, '3 tablespoon'),
(6, 8, '1/2 teaspoon'),
(6, 14, '1 pinch'),
(6, 24, '1 clove minced'),
(6, 26, '1 cup chopped'),
(6, 33, '1 teaspoon'),
(6, 55, '2 medium chopped'),
(6, 58, '1 pound'),
(6, 59, '1 cup'),
(6, 60, '2 tablespoons'),
(6, 61, '1/4 cup or to taste'),
(7, 8, '½ teaspoon \r\n          '),
(7, 9, '1 teaspoon \r\n        '),
(7, 13, '2 tablespoons\r\n    '),
(7, 24, '2 cloves minced\r\n          '),
(7, 26, '2 large finely chopped, 1 diced'),
(7, 27, '½ teaspoon\r\n      '),
(7, 29, '½ teaspoon '),
(7, 34, '4 tablespoons'),
(7, 35, '3 pounds cut into chunks,4 cups chicken stock\r\n          '),
(7, 55, '2 medium  peeled and chopped\r\n         '),
(7, 62, '½ teaspoon \r\n          '),
(7, 65, '1 tablespoon minced\r\n       '),
(7, 67, '2 tablespoons chopped'),
(7, 68, '½ teaspoon grounded, 5 pods cardamom\r\n     '),
(7, 69, '1 (2 inch) piece, 1 (1 inch) piece\r\n     '),
(7, 70, '1 pound \r\n          '),
(7, 71, '3 whole \r\n   \r\n         '),
(7, 72, '1 pinch powdered'),
(7, 87, '4 small peeled and halved'),
(7, 88, '2 1/2 Pinch'),
(8, 24, '2 cloves minced'),
(8, 26, '1 small peeled and sliced vertically\r\n          '),
(8, 34, '2 tablespoons \r\n          '),
(8, 59, '2 cups  halved\r\n          '),
(8, 73, '1/3 cup \r\n         '),
(8, 74, '1 1/2 tablespoons\r\n          '),
(8, 75, '1 tablespoon\r\n      '),
(8, 76, '1 teaspoon or to taste\",\r\n      '),
(8, 77, '2 teaspoons\r\n          '),
(8, 78, '8 ounces \r\n          '),
(8, 79, '8 ounces sliced\r\n          '),
(8, 80, '1 peeled and cut into matchsticks\r\n          '),
(8, 81, '1 large cored and sliced\r\n          '),
(9, 30, '1 (24-ounce) jar\r\n         '),
(9, 82, '8 ounces broken in half\r\n        '),
(9, 83, '8 ounces shredded'),
(10, 14, 'to taste'),
(10, 26, '½ cup chopped '),
(10, 58, '1 pound \r\n         '),
(10, 84, '1 (10.5 ounce) can \r\n         '),
(10, 85, '¾ cup \r\n         '),
(10, 86, '1 cup '),
(10, 87, '3 cups peeled and thinly sliced \r\n');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `phone_number` varchar(20) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `phone_number`, `country`) VALUES
(1, 'Diya Fatima', 'lilanidiya@gmail.com', '$2b$10$NpHoDfyeplCEkUto8/zaFORZBfxMtiKdVPzyQByjSkZ3RUBrvSu5e', '2025-04-15 20:40:27', '03302542822', 'United States'),
(2, 'Mohammad John', 'm.johnkamil@gmail.com', '$2b$10$EyB2IaqMWQPLr4YfkUvSn.MlvlKaed549i0j0TmeweNLqjIWdpifS', '2025-04-15 20:57:49', '03302542822', 'United States'),
(3, 'Diya Fatima', 'dhhh@gmail.com', '$2b$10$zKoX2Y.UMH6idzqdid/njeCbbxKrXZfukmZOc7s7mNvCTdBEqqF5C', '2025-04-16 04:35:23', '03302542822', 'United States'),
(4, 'Diya Fatima', 'lilanidiya2@gmail.com', '$2b$10$3ptHhebkHhDktoqLMgxY5.smmlinQA9j8ABSMCLOEBzebJ.kHbTya', '2025-04-16 20:21:08', '03302542822', 'United States'),
(5, 'Diya Fatima', 'lilanidwwiya@gmail.com', '$2b$10$Nc.3pf2zas2NdQmhXdpvxO4i2YoRDRs07CnfAqSS0kWtvy/d69Cpi', '2025-04-16 20:24:53', '03302542822', 'United States'),
(6, 'Diya Fatima', 'lilanidiyfcga@gmail.com', '$2b$10$dWPGIFLgERGqetWQR2Dt9eMF98KCa593Ny9yZPbiwDrtmpFpktuDG', '2025-04-16 20:32:09', '03302542822', 'United States'),
(7, 'Diya Fatima', 'lilanidiya5@gmail.com', '$2b$10$bMKvhzVDvOfvAA55Tg/tPezsHl.25h9exLDkZr1Znn2/uYcLtCK8q', '2025-04-16 20:40:07', '03302542822', 'United States'),
(8, 'Diya Fatima', 'lilanidiya6@gmail.com', '$2b$10$thgwPiCAHIElKhn0QXTMX.TH9IPJGnVOJ/PIn3Iac3jiogIzP0/h.', '2025-04-17 11:10:45', '03302542822', 'United States'),
(9, 'Diya Fatima', 'lilanidiya7@gmail.com', '$2b$10$Me31S/CyjcE6g3zY9.ddae/70Tzxx2Xiv72IsP/CsDcLbi2/.2CKC', '2025-04-17 11:18:48', '03302542822', 'United States'),
(10, 'Diya Fatima', 'fatima4503167@cloud.neduet.edu.pk', '$2b$10$Hv7eas9LpP6QmiLdVhq1Ke8Bdm9DIkN.zpoMmIRdeAqjKURNmjV0.', '2025-04-22 20:49:35', '03302542822', 'United States'),
(11, 'Admin', 'admin@shoptherecipe.com', '$2b$10$ljh5EZJ1RsNSGv9Ww1qtgeqGmBpxEM5eUWxj4bBwUn3QXmPTHCoXG', '2025-05-11 08:06:25', '03302542822', 'United States'),
(12, 'Hamnah Adnan', 'hamnahadnan@gmail.com', '$2b$10$/8JWYxMWDV570MGeOcTcp.QENgUrFW9N74vEyuJPFpX5usqzkKq72', '2025-05-11 10:17:44', '02524162627', 'United States'),
(13, 'Testing', 'testing123@gmail.com', '$2b$10$rpT5oPeQ1D3o7UGdyJGNRe7MayT4nAqVqg6nwSR0.OL5e/Ll6Euk6', '2025-05-13 16:44:19', '03347379288', 'United States');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`ingredient_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- Indexes for table `contact_form_submissions`
--
ALTER TABLE `contact_form_submissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructions`
--
ALTER TABLE `instructions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `nutrients`
--
ALTER TABLE `nutrients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_id`,`ingredient_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD PRIMARY KEY (`recipe_id`,`ingredient_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=389;

--
-- AUTO_INCREMENT for table `contact_form_submissions`
--
ALTER TABLE `contact_form_submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `instructions`
--
ALTER TABLE `instructions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `nutrients`
--
ALTER TABLE `nutrients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`);

--
-- Constraints for table `instructions`
--
ALTER TABLE `instructions`
  ADD CONSTRAINT `instructions_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);

--
-- Constraints for table `nutrients`
--
ALTER TABLE `nutrients`
  ADD CONSTRAINT `nutrients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`);

--
-- Constraints for table `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`),
  ADD CONSTRAINT `recipe_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
