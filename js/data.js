
window.SITE = {
  categories: [
    { id: "all", label: { en: "All", fr: "Tous" } },
    { id: "wm", label: { en: "World models & robotics", fr: "World models & robotique" } },
    { id: "agents", label: { en: "LLM agents", fr: "Agents LLM" } },
    { id: "gen", label: { en: "Generative AI", fr: "IA générative" } },
    { id: "rl", label: { en: "Reinforcement learning", fr: "Apprentissage par renforcement" } },
    { id: "ml", label: { en: "ML & vision", fr: "ML & vision" } },
    { id: "quantum", label: { en: "Quantum ML", fr: "ML quantique" } },
    { id: "sim", label: { en: "Simulation & multi-agent", fr: "Simulation & multi-agent" } }
  ],

  projects: [
    {
      id: "lewm",
      featured: true,
      cats: ["wm", "rl"],
      title: "LeWM-Robot",
      tagline: { en: "A latent world model that lets a robot arm plan tasks it was never trained on", fr: "Un world model latent qui permet à un bras robotique de planifier des tâches jamais apprises" },
      role: { en: "Initiator & lead", fr: "Initiateur & lead" },
      context: { en: "PoC Innovation, AI pole", fr: "PoC Innovation, pôle IA" },
      date: "2026",
      status: { en: "In progress", fr: "En cours" },
      summary: {
        en: "Instead of training the SO-101 arm on one task, the model learns the dynamics of its own body: an action-conditioned world model predicts how the scene evolves in a frozen DINOv3 latent space, and tasks are solved zero-shot at runtime by planning in that space. The architecture follows DINO-WM (ICML 2025).",
        fr: "Plutôt que d'entraîner le bras SO-101 sur une tâche précise, on lui apprend la dynamique de son propre corps : un world model conditionné par l'action prédit l'évolution de la scène dans l'espace latent d'un DINOv3 figé, et les tâches se résolvent sans entraînement dédié, au moment de l'exécution, par planification dans cet espace. L'architecture suit DINO-WM (ICML 2025)."
      },
      points: {
        en: [
          "Frozen DINOv3 encoder: perception is never retrained, only the dynamics are learned.",
          "Five multi-camera fusion strategies (wrist + global views) implemented and compared; cross-attention kept with a validation MAE of 8.45, against about 11 to 12 for the alternatives.",
          "Transformer predictor trained on Isaac Lab simulation data, with LoRA adapters for sim-to-real transfer and multi-step losses.",
          "Gradient-free CEM planner (3 iterations × 300 candidates × 10 steps) inside an MPC loop, scored by cosine similarity to the goal in latent space.",
          "Reproducible pipeline: smoke test, full run, and a one-command GPU benchmark; demonstrations published in LeRobot format on Hugging Face."
        ],
        fr: [
          "Encodeur DINOv3 figé : la perception n'est jamais réentraînée, seule la dynamique est apprise.",
          "Cinq stratégies de fusion multi-caméra (poignet + vue globale) implémentées et comparées ; la cross-attention est retenue avec une MAE de validation de 8,45, contre 11 à 12 environ pour les autres.",
          "Predictor transformer entraîné sur des données simulées Isaac Lab, avec des adaptateurs LoRA pour le passage simulation → réel et des pertes multi-pas.",
          "Planner CEM sans gradient (3 itérations × 300 candidats × 10 pas) dans une boucle MPC, avec un score de similarité cosinus à l'objectif dans l'espace latent.",
          "Pipeline reproductible : test rapide, exécution complète et benchmark GPU en une commande ; démonstrations publiées au format LeRobot sur Hugging Face."
        ]
      },
      metrics: [
        { v: "8.45", l: { en: "val. MAE, cross-attention fusion", fr: "MAE de validation, fusion cross-attention" } },
        { v: "5", l: { en: "fusion strategies compared", fr: "stratégies de fusion comparées" } },
        { v: "300", l: { en: "CEM candidates per iteration", fr: "candidats CEM par itération" } }
      ],
      flow: {
        en: ["2 cameras", "DINOv3 (frozen)", "cross-attention fusion", "+ action embedding", "predictor + LoRA", "CEM planner", "MPC: act, observe, replan"],
        fr: ["2 caméras", "DINOv3 (figé)", "fusion cross-attention", "+ embedding d'action", "predictor + LoRA", "planner CEM", "MPC : agir, observer, replanifier"]
      },
      stack: ["PyTorch", "DINOv3", "LoRA", "CEM / MPC", "Isaac Lab", "LeRobot", "Hugging Face"],
      links: [{ label: "GitHub", url: "https://github.com/PoCInnovation/LeWM-Robot" }],
      visual: "wm"
    },
    {
      id: "pipeline3d",
      featured: true,
      cats: ["gen"],
      title: "IAPipeline3D V3",
      tagline: { en: "From a text sheet to an animated, game-ready 3D monster, on one consumer GPU", fr: "D'une fiche texte à un monstre 3D animé, prêt pour un jeu, sur une seule carte graphique grand public" },
      role: { en: "Sole author", fr: "Seul auteur" },
      context: { en: "Personal research project", fr: "Projet de recherche personnel" },
      date: "2026",
      status: { en: "Open source", fr: "Open source" },
      summary: {
        en: "A fully local pipeline that turns a JSON description into a textured 3D monster with a looping walk animation, ready for a game engine, with no human in the loop. Everything runs on a single RTX 3080 with 10 GB of VRAM. The central idea: use a video model as the 3D prior.",
        fr: "Une pipeline 100 % locale qui transforme une description JSON en monstre 3D texturé, avec une animation de marche en boucle, prêt pour un moteur de jeu, sans intervention humaine. Tout tourne sur une seule RTX 3080 de 10 Go. L'idée centrale : utiliser un modèle vidéo comme a priori 3D."
      },
      points: {
        en: [
          "Video as the backbone: Wan 2.2 (14B) films a turntable of the concept with an orbit LoRA, which yields four consistent views of the creature.",
          "Multi-view 3D with known cameras (Pixal3D), chosen over TRELLIS.2 after experiments: TRELLIS.2 has no notion of camera and mixes contradictory guesses.",
          "A vision-language model (Qwen3-VL-4B) acts as the eyes: it rejects concepts with the wrong number of limbs, picks the views and describes the joints for rigging.",
          "Animation driven by an action video: the LLM writes a gait adapted to the body, Wan films it, and R-DMesh transfers it to the mesh as a seamless loop.",
          "Fits in 10 GB through one model at a time and GGUF quantization (Q4/Q8). One resumable command, about 40 minutes per monster, about 16k triangles with 2048 px textures."
        ],
        fr: [
          "La vidéo comme colonne vertébrale : Wan 2.2 (14B) filme le concept en tournant autour, grâce à une LoRA d'orbite, ce qui donne quatre vues cohérentes de la créature.",
          "3D multi-vues avec caméras connues (Pixal3D), retenue face à TRELLIS.2 après essais : TRELLIS.2 n'a pas de notion de caméra et mélange des suppositions contradictoires.",
          "Un modèle vision-langage (Qwen3-VL-4B) sert d'yeux : il rejette les concepts au mauvais nombre de membres, choisit les vues et décrit les articulations pour le squelette.",
          "Animation pilotée par une vidéo d'action : le LLM écrit une allure adaptée au corps, Wan la filme, et R-DMesh la transfère au maillage en boucle sans couture.",
          "Tient dans 10 Go grâce à un seul modèle chargé à la fois et à la quantification GGUF (Q4/Q8). Une commande qui reprend là où elle s'est arrêtée, environ 40 minutes par monstre, environ 16 000 triangles et des textures de 2048 px."
        ]
      },
      metrics: [
        { v: "10 GB", l: { en: "VRAM, RTX 3080", fr: "de VRAM, RTX 3080" } },
        { v: "~40 min", l: { en: "text to animated GLB", fr: "du texte au GLB animé" } },
        { v: "0", l: { en: "manual steps", fr: "étape manuelle" } }
      ],
      flow: {
        en: ["text sheet", "concepts (Qwen-Image)", "VLM judge", "turntable video (Wan 2.2)", "4 views", "3D + texture (Pixal3D)", "walk video", "looping GLB"],
        fr: ["fiche texte", "concepts (Qwen-Image)", "juge VLM", "vidéo de tour (Wan 2.2)", "4 vues", "3D + texture (Pixal3D)", "vidéo de marche", "GLB en boucle"]
      },
      stack: ["Wan 2.2", "Qwen-Image", "Qwen3-VL", "Pixal3D", "ComfyUI", "Blender", "GGUF", "Python"],
      links: [
        { label: "GitHub (V3)", url: "https://github.com/divisio74/IAPipeline3DLOCALV3" },
        { label: "GitHub (V1)", url: "https://github.com/divisio74/IAPipeline3DLOCAL" }
      ],
      visual: "mesh"
    },
    {
      id: "sensia",
      featured: true,
      cats: ["agents"],
      title: "Sensia",
      tagline: { en: "A local LLM agent that runs its own code and fixes it from the real traceback", fr: "Un agent LLM local qui exécute son propre code et le corrige à partir de la vraie trace d'erreur" },
      role: { en: "Execution sandbox & reflection loop", fr: "Bac à sable d'exécution & boucle de réflexion" },
      context: { en: "Epitech, team project", fr: "Epitech, projet d'équipe" },
      date: "2026",
      status: { en: "Delivered", fr: "Livré" },
      summary: {
        en: "A local assistant built on Ollama, with no LLM framework: every model call is a plain HTTP request. Given a task, its code agent writes Python, runs it in an isolated container, reads the real error output and rewrites the code until it runs, or until it detects that it is going in circles.",
        fr: "Un assistant local construit sur Ollama, sans framework LLM : chaque appel au modèle est une simple requête HTTP. Face à une tâche, son agent de code écrit du Python, l'exécute dans un conteneur isolé, lit la vraie sortie d'erreur et réécrit le code jusqu'à ce qu'il tourne, ou jusqu'à détecter qu'il tourne en rond."
      },
      points: {
        en: [
          "My part: the reflection loop is grounded in execution, not self-critique. The feedback signal is the interpreter's stderr; a 3B model is a poor judge of its own work, a traceback is not.",
          "Stagnation detection through a structural fingerprint of each attempt (AST dump), which ignores whitespace and comments.",
          "One Docker container per run: no network, read-only file system, 256 MB memory cap, process limit. Overhead of 0.2 to 0.5 s per execution.",
          "RAG over local documents with sources and a relevance threshold; web search chosen by the model through an MCP server.",
          "Time-budgeted tasks: a Bayesian fusion of a history estimate and a live estimate. Budget kept in 20 of 24 runs; prediction error falls from 37 % on a new task to 9 % once 90 % of the answer is written.",
          "Four local models benchmarked on CPU only (speed, memory, code-loop success) to justify the default model."
        ],
        fr: [
          "Ma partie : la boucle de réflexion s'appuie sur l'exécution, pas sur l'autocritique. Le signal de retour est la sortie d'erreur de l'interpréteur ; un modèle de 3B juge mal son propre travail, une trace d'erreur ne ment pas.",
          "Détection de la stagnation par une empreinte structurelle de chaque tentative (dump de l'AST), qui ignore espaces et commentaires.",
          "Un conteneur Docker par exécution : pas de réseau, système de fichiers en lecture seule, mémoire limitée à 256 Mo, nombre de processus limité. Surcoût de 0,2 à 0,5 s par exécution.",
          "RAG sur des documents locaux avec sources et seuil de pertinence ; recherche web choisie par le modèle via un serveur MCP.",
          "Tâches sous budget de temps : fusion bayésienne d'une estimation historique et d'une estimation en direct. Budget tenu dans 20 essais sur 24 ; l'erreur de prédiction passe de 37 % sur une tâche nouvelle à 9 % une fois 90 % de la réponse écrite.",
          "Quatre modèles locaux comparés sur CPU seul (vitesse, mémoire, réussite de la boucle de code) pour justifier le modèle par défaut."
        ]
      },
      metrics: [
        { v: "20/24", l: { en: "time budgets kept", fr: "budgets de temps tenus" } },
        { v: "9 %", l: { en: "prediction error at 90 % progress", fr: "d'erreur de prédiction à 90 %" } },
        { v: "0.2 s", l: { en: "sandbox overhead per run", fr: "de surcoût du bac à sable" } }
      ],
      flow: {
        en: ["task", "LLM writes code", "Docker sandbox", "stderr", "rewrite", "AST stagnation check", "result"],
        fr: ["tâche", "le LLM écrit le code", "bac à sable Docker", "stderr", "réécriture", "test de stagnation (AST)", "résultat"]
      },
      stack: ["Python", "Ollama", "Qwen2.5", "Docker", "MCP", "RAG", "FastAPI"],
      links: [{ label: "GitHub", url: "https://github.com/divisio74/Sensai" }],
      visual: "agent"
    },
    {
      id: "fastquantum",
      featured: true,
      cats: ["quantum"],
      title: "FastQuantum",
      tagline: { en: "Predicting optimal QAOA parameters from the problem graph with a graph neural network", fr: "Prédire les paramètres QAOA optimaux à partir du graphe du problème, avec un réseau de neurones sur graphes" },
      role: { en: "Contributor: prototype, GPU dataset generator, graph colouring", fr: "Contributeur : prototype, générateur GPU, coloration de graphe" },
      context: { en: "PoC Innovation, research project", fr: "PoC Innovation, projet de recherche" },
      date: "2025 – 2026",
      status: { en: "Research", fr: "Recherche" },
      summary: {
        en: "QAOA needs a costly variational loop to find its rotation angles. FastQuantum learns to predict those angles (γ, β) directly from the structure of the problem, so that a single forward pass replaces the classical optimisation.",
        fr: "QAOA a besoin d'une boucle variationnelle coûteuse pour trouver ses angles de rotation. FastQuantum apprend à prédire ces angles (γ, β) directement à partir de la structure du problème, pour qu'une seule passe du réseau remplace l'optimisation classique."
      },
      points: {
        en: [
          "Graph attention network with edge-conditioned attention: the Hamiltonian weights J_ij decide how much each connection matters.",
          "Laplacian positional encodings give the network spectral coordinates, which helps it tell non-isomorphic graphs apart.",
          "Dataset generator over five graph families (Erdős–Rényi, Barabási–Albert, regular, Watts–Strogatz, lollipop) and three problems (MaxCut, maximum independent set, maximum clique).",
          "Ground truth by exhaustive search, QAOA angles optimised with Qiskit and COBYLA, and only instances with an approximation ratio above 0.85 are kept.",
          "My contributions: the first prototype, the GPU dataset generator and the graph colouring extension."
        ],
        fr: [
          "Réseau d'attention sur graphes, avec une attention conditionnée par les arêtes : les poids J_ij du hamiltonien décident de l'importance de chaque connexion.",
          "Des encodages positionnels laplaciens donnent au réseau des coordonnées spectrales, ce qui l'aide à distinguer des graphes non isomorphes.",
          "Générateur de données sur cinq familles de graphes (Erdős–Rényi, Barabási–Albert, réguliers, Watts–Strogatz, lollipop) et trois problèmes (MaxCut, stable maximum, clique maximum).",
          "Vérité terrain par recherche exhaustive, angles QAOA optimisés avec Qiskit et COBYLA, et seules les instances au ratio d'approximation supérieur à 0,85 sont conservées.",
          "Mes contributions : le premier prototype, le générateur de données sur GPU et l'extension à la coloration de graphe."
        ]
      },
      metrics: [
        { v: "5", l: { en: "graph families", fr: "familles de graphes" } },
        { v: "3", l: { en: "combinatorial problems", fr: "problèmes combinatoires" } },
        { v: "> 0.85", l: { en: "approximation ratio filter", fr: "filtre sur le ratio d'approximation" } }
      ],
      stack: ["PyTorch", "GAT", "Qiskit", "QAOA", "NetworkX", "CUDA"],
      links: [{ label: "GitHub", url: "https://github.com/PoCInnovation/FastQuantum" }],
      visual: "graph"
    },
    {
      id: "startrek",
      featured: true,
      cats: ["rl"],
      title: "StarTrek",
      tagline: { en: "A Deep Q-Network from scratch, and the statistics to prove it works", fr: "Un Deep Q-Network codé à la main, et les statistiques pour prouver qu'il marche" },
      role: { en: "Team of two", fr: "Équipe de deux" },
      context: { en: "Epitech, AI module", fr: "Epitech, module IA" },
      date: "2026",
      status: { en: "Delivered", fr: "Livré" },
      summary: {
        en: "Landing a lunar module in Gymnasium's LunarLander-v3, starting from a hand-written heuristic policy and building a full DQN: dynamic MLP, replay buffer, target network, ε-greedy decay. The real goal was to move from \"it works\" to \"I can show it works\".",
        fr: "Faire atterrir un module lunaire dans LunarLander-v3 (Gymnasium), en partant d'une politique heuristique écrite à la main, puis en construisant un DQN complet : MLP dynamique, replay buffer, réseau cible, décroissance ε-greedy. Le vrai objectif : passer de « ça marche » à « je peux montrer que ça marche »."
      },
      points: {
        en: [
          "Mean return above 200, the \"solved\" threshold, on all 5 seeds tested, reported with a 95 % confidence interval.",
          "Ablation on the replay buffer size, from 1K to 90K transitions.",
          "An initial intuition (50K would be best) was invalidated by the data: 90K won. The hypothesis, the test on 3 seeds and the result are documented as they happened.",
          "Eight linted Python modules, eleven YAML configurations, CSV logs and about a hundred evaluation videos."
        ],
        fr: [
          "Retour moyen supérieur à 200, le seuil « résolu », sur les 5 graines testées, avec un intervalle de confiance à 95 %.",
          "Étude d'ablation sur la taille du replay buffer, de 1K à 90K transitions.",
          "Une intuition de départ (50K serait optimal) a été invalidée par les données : 90K l'emporte. L'hypothèse, le test sur 3 graines et le résultat sont documentés tels quels.",
          "Huit modules Python vérifiés par un linter, onze configurations YAML, des logs CSV et une centaine de vidéos d'évaluation."
        ]
      },
      metrics: [
        { v: "> 200", l: { en: "mean return, 5/5 seeds", fr: "de retour moyen, 5 graines sur 5" } },
        { v: "95 %", l: { en: "confidence intervals", fr: "intervalles de confiance" } },
        { v: "1K → 90K", l: { en: "buffer ablation", fr: "ablation du buffer" } }
      ],
      figures: [
        { src: "assets/img/startrek_train.png", alt: { en: "Training curves for four buffer sizes", fr: "Courbes d'entraînement pour quatre tailles de buffer" }, cap: { en: "Training for four buffer sizes: smoothed return, ε decay and episode length. Real project output.", fr: "Entraînement pour quatre tailles de buffer : retour lissé, décroissance d'ε et longueur d'épisode. Sortie réelle du projet." } },
        { src: "assets/img/startrek_ablation.png", alt: { en: "Buffer size ablation", fr: "Ablation de la taille du buffer" }, cap: { en: "Ablation on the replay buffer size.", fr: "Ablation sur la taille du replay buffer." } }
      ],
      stack: ["Python", "PyTorch", "Gymnasium", "DQN", "Ablation study", "Multi-seed"],
      links: [{ label: "GitHub", url: "https://github.com/divisio74/Startrek" }],
      visual: "img",
      img: "assets/img/startrek_train.png"
    },
    {
      id: "mlblock",
      featured: true,
      led: true,
      cats: ["ml"],
      title: "MLBlock",
      tagline: { en: "Scratch for AI: build and train neural networks with visual blocks", fr: "Le Scratch de l'IA : construire et entraîner des réseaux de neurones avec des blocs visuels" },
      role: { en: "Project manager, led the dev team", fr: "Chef de projet, direction de l'équipe de dev" },
      context: { en: "PoC Innovation", fr: "PoC Innovation" },
      date: "2026",
      status: { en: "Led", fr: "Dirigé" },
      summary: {
        en: "A visual, no-code web application where anyone assembles a machine learning, deep learning or reinforcement learning pipeline from blocks (layers, datasets, training parameters). The blocks are translated into a PyTorch model that trains and evaluates in real time, keeping the logic visible and educational.",
        fr: "Une application web visuelle et sans code où chacun assemble une pipeline de machine learning, de deep learning ou d'apprentissage par renforcement à partir de blocs (couches, jeux de données, paramètres d'entraînement). Les blocs sont traduits en modèle PyTorch, entraîné et évalué en temps réel, en gardant la logique visible et pédagogique."
      },
      points: {
        en: [
          "I led the development team of two engineers, who wrote about 570 commits: roadmap, technical choices and coordination.",
          "Blocks compile to a real PyTorch model; training runs on a GPU backend and streams its results back to the interface.",
          "Covers classical ML, deep learning and reinforcement learning in a single visual language."
        ],
        fr: [
          "J'ai dirigé l'équipe de développement, deux ingénieurs qui ont écrit environ 570 commits : feuille de route, choix techniques et coordination.",
          "Les blocs sont compilés en vrai modèle PyTorch ; l'entraînement tourne sur un backend GPU et renvoie ses résultats à l'interface.",
          "Couvre le ML classique, le deep learning et l'apprentissage par renforcement dans un même langage visuel."
        ]
      },
      metrics: [
        { v: "2", l: { en: "engineers led", fr: "ingénieurs dirigés" } },
        { v: "~570", l: { en: "commits by the team", fr: "commits de l'équipe" } }
      ],
      stack: ["PyTorch", "TypeScript", "Python", "Docker", "No-code"],
      links: [{ label: "GitHub", url: "https://github.com/PoCInnovation/MLBlock" }],
      visual: "blocks"
    },
    {
      id: "mytorch",
      cats: ["ml"],
      title: "MyTorch",
      tagline: { en: "A neural network written with NumPy only, that reads chess positions", fr: "Un réseau de neurones écrit uniquement avec NumPy, qui lit des positions d'échecs" },
      role: { en: "Epitech", fr: "Epitech" },
      context: { en: "Epitech", fr: "Epitech" },
      date: "2026",
      summary: {
        en: "Forward pass, backpropagation and optimisation written by hand in NumPy, then used to classify the state of chess positions given in FEN notation, through a command-line analyser.",
        fr: "Passe avant, rétropropagation et optimisation écrites à la main en NumPy, puis utilisées pour classer l'état de positions d'échecs en notation FEN, via un analyseur en ligne de commande."
      },
      points: {
        en: ["Dropout, L2 regularisation, mini-batches and early stopping implemented from first principles.", "Dataset builder that encodes and balances the positions; train and predict modes with a saved model file."],
        fr: ["Dropout, régularisation L2, mini-batchs et arrêt anticipé implémentés à partir des principes.", "Constructeur de jeu de données qui encode et équilibre les positions ; modes entraînement et prédiction avec fichier de modèle sauvegardé."]
      },
      stack: ["Python", "NumPy", "Backpropagation"],
      links: [{ label: "GitHub", url: "https://github.com/divisio74/MyTorch" }],
      visual: "nn"
    },
    {
      id: "cvrie",
      cats: ["ml"],
      title: "CVRIE",
      tagline: { en: "Supervised vision and unsupervised NLP on medical data", fr: "Vision supervisée et NLP non supervisé sur des données médicales" },
      role: { en: "Epitech", fr: "Epitech" },
      context: { en: "Epitech, AI module", fr: "Epitech, module IA" },
      date: "2026",
      summary: {
        en: "Two complete ML pipelines. Supervised: 17,092 blood cell images in 8 classes, with HOG and HSV histogram features and an MLP. Unsupervised: clustering of 1,010 medical testimonies with TF-IDF-weighted Word2Vec embeddings.",
        fr: "Deux pipelines ML complètes. Supervisée : 17 092 images de cellules sanguines en 8 classes, avec des descripteurs HOG et des histogrammes HSV, et un MLP. Non supervisée : regroupement de 1 010 témoignages médicaux avec des embeddings Word2Vec pondérés par TF-IDF."
      },
      points: {
        en: ["Class imbalance handled with a weighted loss; full exploratory analysis.", "K-means against DBSCAN, k chosen by cosine silhouette, giving 5 coherent themes, checked by t-SNE and by hand."],
        fr: ["Déséquilibre des classes traité par une perte pondérée ; analyse exploratoire complète.", "K-means contre DBSCAN, k choisi par silhouette cosinus, ce qui donne 5 thèmes cohérents, vérifiés par t-SNE et à la main."]
      },
      figures: [
        { src: "assets/img/cvrie_cells.jpg", alt: { en: "The 8 blood cell classes", fr: "Les 8 classes de cellules sanguines" }, cap: { en: "The 8 classes of the dataset (CellaVision DM96 microscopy).", fr: "Les 8 classes du jeu de données (microscopie CellaVision DM96)." } },
        { src: "assets/img/cvrie_tsne.png", alt: { en: "t-SNE of the testimonies", fr: "t-SNE des témoignages" }, cap: { en: "t-SNE of the testimonies (TF-IDF × Word2Vec), K-means with k = 5.", fr: "t-SNE des témoignages (TF-IDF × Word2Vec), K-means avec k = 5." } }
      ],
      stack: ["scikit-learn", "spaCy", "HOG", "TF-IDF", "Word2Vec", "K-means", "DBSCAN", "t-SNE"],
      links: [{ label: "GitHub", url: "https://github.com/divisio74/Cvrie-supervised-and-unsupervised-study" }],
      visual: "img",
      img: "assets/img/cvrie_tsne.png"
    },
    {
      id: "zappy",
      cats: ["sim"],
      title: "Zappy",
      tagline: { en: "Autonomous AI clients that cooperate in a networked world", fr: "Des clients IA autonomes qui coopèrent dans un monde en réseau" },
      role: { en: "AI client", fr: "Client IA" },
      context: { en: "Epitech, team project", fr: "Epitech, projet d'équipe" },
      date: "2026",
      summary: {
        en: "A multi-agent game where AI players gather resources, survive and level up together on a shared map. I worked on the heuristic AI: roles, coordination between agents and the network protocol with the server.",
        fr: "Un jeu multi-agents où des joueurs IA récoltent des ressources, survivent et montent de niveau ensemble sur une carte partagée. J'ai travaillé sur l'IA heuristique : rôles, coordination entre agents et protocole réseau avec le serveur."
      },
      points: {
        en: ["Agents with roles and message-based coordination to gather the players a ritual needs.", "Python client talking to the game server over TCP."],
        fr: ["Des agents avec des rôles et une coordination par messages pour réunir les joueurs nécessaires à un rituel.", "Client Python qui dialogue avec le serveur du jeu en TCP."]
      },
      stack: ["Python", "Multi-agent", "TCP", "Heuristics"],
      links: [{ label: "GitHub", url: "https://github.com/divisio74/zappy" }],
      visual: "swarm"
    },
    {
      id: "interstonar",
      cats: ["sim"],
      title: "Interstonar",
      tagline: { en: "An N-body gravity simulation, integrated step by step", fr: "Une simulation gravitationnelle à N corps, intégrée pas à pas" },
      role: { en: "Epitech", fr: "Epitech" },
      context: { en: "Epitech, maths module", fr: "Epitech, module de maths" },
      date: "2025",
      summary: {
        en: "Newton's law of gravitation and Euler integration in 3D with NumPy: forces, then accelerations, then velocities, then positions, with collision detection between bodies.",
        fr: "Loi de la gravitation de Newton et intégration d'Euler en 3D avec NumPy : forces, puis accélérations, puis vitesses, puis positions, avec détection des collisions entre corps."
      },
      points: {
        en: ["Vectorised force computation on 3D arrays.", "Explicit Euler scheme, with a clear account of its limits."],
        fr: ["Calcul vectorisé des forces sur des tableaux 3D.", "Schéma d'Euler explicite, avec ses limites expliquées."]
      },
      stack: ["Python", "NumPy", "Numerical integration"],
      links: [{ label: "GitHub", url: "https://github.com/divisio74/interstonar" }],
      visual: "orbits"
    }
  ],

  foundations: [
    { name: "hill-cipher-matrix", d: { en: "Hill cipher with matrix inversion", fr: "Chiffrement de Hill par inversion de matrice" } },
    { name: "streaming-statistics", d: { en: "Statistics computed on a stream", fr: "Statistiques calculées au fil de l'eau" } },
    { name: "population-regression", d: { en: "Linear regression on demographic data", fr: "Régression linéaire sur des données démographiques" } },
    { name: "geometric-transformations", d: { en: "Translations, rotations, reflections as matrices", fr: "Translations, rotations, symétries par matrices" } },
    { name: "stoneanalysis", d: { en: "Frequency analysis with the FFT", fr: "Analyse de fréquences par FFT" } },
    { name: "c-dataframe", d: { en: "A dataframe library written in C", fr: "Une bibliothèque de dataframes en C" } }
  ],

  poc: {
    teams: ["lewm", "mlblock", "fastquantum"],
    event: {
      name: "European AI Championship",
      date: { en: "20–22 Nov 2026 · Epitech Paris", fr: "20–22 nov. 2026 · Epitech Paris" },
      role: { en: "Co-organiser with PoC Innovation", fr: "Co-organisateur avec PoC Innovation" },
      d: {
        en: "The Paris stage of the European AI Championship, led by the CISPA Helmholtz Center for Information Security and Fraunhofer AISEC, co-organised by PoC Innovation and supported by Meta.",
        fr: "L'étape parisienne du European AI Championship, menée par le CISPA Helmholtz Center for Information Security et le Fraunhofer AISEC, co-organisée par PoC Innovation avec le soutien de Meta."
      },
      nums: [
        { v: "24 h", l: { en: "non-stop, overnight on site", fr: "non-stop, nuit sur place" } },
        { v: "~200", l: { en: "participants, teams of 3–4", fr: "participants, équipes de 3 à 4" } },
        { v: "3", l: { en: "AI security challenges by CISPA researchers", fr: "défis de sécurité de l'IA conçus par les chercheurs du CISPA" } },
        { v: { en: "€10k", fr: "10 k€" }, l: { en: "in cash prizes, keynote by Meta", fr: "de prix, keynote de Meta" } }
      ]
    }
  },

  experience: [
    {
      period: { en: "Sept 2026 – now", fr: "sept. 2026 – aujourd'hui" },
      title: { en: "AI engineering intern", fr: "Stagiaire ingénieur IA" },
      place: "Hand-e",
      text: {
        en: "Resource broker for LLM agents: measuring each task's consumption (tokens, CPU, time) and feeding it back to the model so it can adapt live. Built a Bayesian cost predictor evaluated on 5,396 public SWE-rebench agent trajectories, with task-level bootstrap confidence intervals, and a GPU scheduling simulation.",
        fr: "Broker de ressources pour agents LLM : mesurer la consommation de chaque tâche (tokens, CPU, temps) et la renvoyer au modèle pour qu'il s'adapte en direct. Conception d'un prédicteur de coût bayésien, évalué sur 5 396 trajectoires d'agents publiques de SWE-rebench avec des intervalles de confiance par bootstrap, et d'une simulation d'ordonnancement GPU."
      },
      tags: ["LLM agents", "Bayesian prediction", "Bootstrap", "cgroups", "GPU scheduling"]
    },
    {
      period: { en: "2026 – now", fr: "2026 – aujourd'hui" },
      title: { en: "AI Lead", fr: "Responsable du pôle IA" },
      place: "PoC Innovation",
      text: {
        en: "Leading the AI pole of France's first student innovation centre: four student research teams led, from the first idea to a documented result. Initiated and lead LeWM-Robot, managed the MLBlock development team, contributed to FastQuantum. Co-organised the Paris stage of the European AI Championship (CISPA, Fraunhofer AISEC, Meta; about 200 participants).",
        fr: "Direction du pôle IA du premier centre d'innovation étudiant français : quatre équipes de recherche étudiantes menées, de l'idée à un résultat documenté. Lancement et lead de LeWM-Robot, direction de l'équipe de développement de MLBlock, contribution à FastQuantum. Co-organisation de l'étape parisienne du European AI Championship (CISPA, Fraunhofer AISEC, Meta ; environ 200 participants)."
      },
      tags: ["Research leadership", "Event organisation", "World models", "Robotics"]
    },
    {
      period: { en: "Sept 2025 – Jan 2026", fr: "sept. 2025 – janv. 2026" },
      title: { en: "Junior blockchain engineer", fr: "Junior ingénieur blockchain" },
      place: "Gnoland (New Tendermint)",
      text: {
        en: "GRC721 token ecosystem with on-chain DAO governance, written in Gno (Go), in production conditions.",
        fr: "Écosystème de jetons GRC721 avec gouvernance DAO on-chain, écrit en Gno (Go), en conditions de production."
      },
      tags: ["Go", "Smart contracts"]
    },
    {
      period: { en: "2024 – 2029", fr: "2024 – 2029" },
      title: { en: "Master-level degree in IT, AI track", fr: "Expert en technologies de l'information (bac+5), spécialité IA" },
      place: "Epitech Lyon",
      text: {
        en: "Systems programming in C and C++, mathematics, then a specialisation in artificial intelligence.",
        fr: "Programmation système en C et C++, mathématiques, puis spécialisation en intelligence artificielle."
      },
      tags: ["C / C++", "Maths", "AI"]
    },
    {
      period: { en: "2022 – 2024", fr: "2022 – 2024" },
      title: { en: "MSc AI & Digital Strategy Management", fr: "MSc AI & Digital Strategy Management" },
      place: "Burgundy School of Business",
      text: {
        en: "Data analysis and finance, English track. Thesis: how professionals perceive the ethical challenges of AI in medicine.",
        fr: "Analyse de données et finance, en anglais. Mémoire : la perception des enjeux éthiques de l'IA en milieu médical."
      },
      tags: ["AI ethics", "Data analysis"]
    },
    {
      period: { en: "2019 – 2022", fr: "2019 – 2022" },
      title: { en: "Bachelor in International Business", fr: "Bachelor in International Business" },
      place: "Grenoble École de Management",
      text: {
        en: "Data analysis, finance and management, English track.",
        fr: "Analyse de données, finance et management, en anglais."
      },
      tags: ["Finance"]
    }
  ],

  hackathons: [
    {
      t: "European AI Championship",
      e: { en: "Paris 2026 · co-organiser", fr: "Paris 2026 · co-organisateur" },
      d: { en: "24-hour AI security hackathon at Epitech Paris with CISPA, Fraunhofer AISEC and Meta: about 200 participants, €10,000 in prizes. Co-organised with PoC Innovation.", fr: "Hackathon de 24 h sur la sécurité de l'IA à Epitech Paris avec le CISPA, le Fraunhofer AISEC et Meta : environ 200 participants, 10 000 € de prix. Co-organisé avec PoC Innovation." },
      award: true
    },
    {
      t: "RentARealHuman",
      e: "ETHGlobal Cannes 2026",
      d: { en: "When an AI agent reaches the limits of the digital world, it hires a real human to act for it: infrastructure for agentic AI, with agents connected through MCP.", fr: "Quand un agent IA atteint les limites du monde numérique, il loue un humain bien réel pour agir à sa place : une infrastructure pour l'IA agentique, avec des agents connectés via MCP." }
    },
    {
      t: { en: "3rd place", fr: "3ᵉ place" },
      e: "Ramify × PoC",
      d: { en: "Fintech hackathon at the meeting point of finance and AI. Podium: 3rd place overall.", fr: "Hackathon fintech, à la rencontre de la finance et de l'IA. Podium : 3ᵉ place au classement général." },
      award: true
    },
    {
      t: "PoC Grand Prix",
      e: "PoC Innovation",
      d: { en: "The association's flagship hackathon: an intensive team sprint, from idea to pitch in front of a jury.", fr: "Le hackathon phare de l'association : un sprint intensif en équipe, de l'idée au pitch devant un jury." }
    }
  ],

  skills: [
    { g: { en: "Machine learning", fr: "Machine learning" }, items: ["PyTorch", "NumPy", "scikit-learn", "GAT", "Backpropagation", "LoRA", "DINOv3"] },
    { g: { en: "Research methods", fr: "Méthodes de recherche" }, items: ["Ablation study", "Multi-seed", "Confidence intervals", "Bayesian prediction", "Benchmarks"] },
    { g: { en: "LLMs & agents", fr: "LLM & agents" }, items: ["Ollama", "RAG", "MCP", "Docker", "Qwen2.5", "Qwen3-VL"] },
    { g: { en: "Generative models", fr: "Modèles génératifs" }, items: ["Wan 2.2", "Qwen-Image", "Pixal3D", "ComfyUI", "GGUF", "Blender"] },
    { g: { en: "RL, robotics & simulation", fr: "RL, robotique & simulation" }, items: ["DQN", "Gymnasium", "CEM / MPC", "Isaac Lab", "LeRobot", "Multi-agent", "Numerical integration"] },
    { g: { en: "Vision, NLP & quantum", fr: "Vision, NLP & quantique" }, items: ["HOG", "spaCy", "TF-IDF", "Word2Vec", "t-SNE", "Qiskit", "QAOA"] },
    { g: { en: "Engineering", fr: "Ingénierie" }, items: ["Python", "C / C++", "Go", "TypeScript", "FastAPI", "Linux", "Git"] }
  ],

  marquee: ["PyTorch", "DINOv3", "World models", "LoRA", "CEM / MPC", "Isaac Lab", "LeRobot", "Ollama", "RAG", "MCP", "Docker", "Wan 2.2", "Qwen3-VL", "Pixal3D", "ComfyUI", "DQN", "Gymnasium", "Qiskit", "QAOA", "GNN", "scikit-learn", "NumPy", "Hugging Face", "Python", "C / C++", "Go"],

  contact: [
    { label: "Email", value: "pierre.baud@epitech.eu", url: "mailto:pierre.baud@epitech.eu", copy: true },
    { label: "GitHub", value: "github.com/divisio74", url: "https://github.com/divisio74" },
    { label: "PoC", value: { en: "PoC Innovation, AI pole", fr: "PoC Innovation, pôle IA" }, url: "https://www.poc-innovation.fr/" }
  ]
};
