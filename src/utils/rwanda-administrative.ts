export interface AdministrativeDivision {
  name: string;
  districts?: AdministrativeDivision[];
  sectors?: AdministrativeDivision[];
  cells?: string[];
}

export const rwandaProvinces: AdministrativeDivision[] = [
  {
    name: "East",
    districts: [
      {
        name: "Bugesera",
        sectors: [
          { name: "Gashora", cells: ["Biryogo", "Kabuye", "Kagomasi", "Mwendo", "Ramiro"] },
          { name: "Juru", cells: ["Juru", "Kabukuba", "Mugorore", "Musovu", "Rwinume"] },
          { name: "Kamabuye", cells: ["Biharagu", "Burenge", "Kampeka", "Nyakayaga", "Tunda"] },
          { name: "Mareba", cells: ["Bushenyi", "Gakomeye", "Nyamigina", "Rango", "Rugarama"] },
          { name: "Mayange", cells: ["Gakamba", "Kagenge", "Kibenga", "Kibirizi", "Mbyo"] },
          { name: "Musenyi", cells: ["Gicaca", "Musenyi", "Nyagihunika", "Rulindo"] },
          { name: "Mwogo", cells: ["Bitaba", "Kagasa", "Rugunga", "Rurenge"] },
          { name: "Ngeruka", cells: ["Gihembe", "Murama", "Ngeruka", "Nyakayenzi", "Rutonde"] },
          { name: "Ntarama", cells: ["Cyugaro", "Kanzenze", "Kibungo"] },
          { name: "Nyamata", cells: ["Kanazi", "Kayumba", "Maranyundo", "Murama", "Nyamata y'Umujyi"] },
          { name: "Nyarugenge", cells: ["Gihinga", "Kabuye", "Murambi", "Ngenda", "Rugando"] },
          { name: "Rilima", cells: ["Kabeza", "Karera", "Kimaranzara", "Ntarama", "Nyabagendwa"] },
          { name: "Ruhuha", cells: ["Bihari", "Gatanga", "Gikundamvura", "Kindama", "Ruhuha"] },
          { name: "Rweru", cells: ["Batima", "Kintambwe", "Mazane", "Nemba", "Nkanga", "Sharita"] },
          { name: "Shyara", cells: ["Kabagugu", "Kamabuye", "Nziranziza", "Rebero", "Rutare"] }
        ]
      },
      {
        name: "Gatsibo",
        sectors: [
          { name: "Gasange", cells: ["Kigabiro", "Kimana", "Teme", "Viro"] },
          { name: "Gatsibo", cells: ["Gatsibo", "Manishya", "Mugera", "Nyabicwamba", "Nyagahanga"] },
          { name: "Gitoki", cells: ["Bukomane", "Cyabusheshe", "Karubungo", "Mpondwa", "Nyamirama", "Rubira"] },
          { name: "Kabarore", cells: ["Kabarore", "Kabeza", "Karenge", "Marimba", "Nyabikiri", "Simbwa"] },
          { name: "Kageyo", cells: ["Busetsa", "Gituza", "Kintu", "Nyagisozi"] },
          { name: "Kiramuruzi", cells: ["Akabuga", "Gakenke", "Gakoni", "Nyabisindu"] },
          { name: "Kiziguro", cells: ["Agakomeye", "Mbogo", "Ndatemwa", "Rubona"] },
          { name: "Muhura", cells: ["Bibare", "Gakorokombe", "Mamfu", "Rumuli", "Taba"] },
          { name: "Murambi", cells: ["Murambi", "Nyamiyaga", "Rwankuba", "Rwimitereri"] },
          { name: "Ngarama", cells: ["Bugamba", "Karambi", "Kigasha", "Ngarama", "Nyarubungo"] },
          { name: "Nyagihanga", cells: ["Gitinda", "Kibare", "Mayange", "Murambi", "Nyagitabire", "Nyamirama"] },
          { name: "Remera", cells: ["Bushobora", "Butiruka", "Kigabiro", "Nyagakombe", "Rurenge", "Rwarenga"] },
          { name: "Rugarama", cells: ["Bugarama", "Gihuta", "Kanyangese", "Matare", "Matunguru", "Remera"] },
          { name: "Rwimbogo", cells: ["Kiburara", "Munini", "Nyamatete", "Rwikiniro"] }
        ]
      },
      {
        name: "Kayonza",
        sectors: [
          { name: "Gahini", cells: ["Juru", "Kahi", "Kiyenzi", "Urugarama"] },
          { name: "Kabare", cells: ["Cyarubare", "Gitara", "Kirehe", "Rubimba", "Rubumba"] },
          { name: "Kabarondo", cells: ["Cyabajwa", "Cyinzovu", "Kabura", "Rusera"] },
          { name: "Mukarange", cells: ["Bwiza", "Kayonza", "Mburabuturo", "Nyagatovu", "Rugendabari"] },
          { name: "Murama", cells: ["Bunyentongo", "Muko", "Murama", "Nyakanazi", "Rusave"] },
          { name: "Murundi", cells: ["Buhabwa", "Karambi", "Murundi", "Ryamanyoni"] },
          { name: "Mwiri", cells: ["Kageyo", "Migera", "Nyamugari", "Nyawera"] },
          { name: "Ndego", cells: ["Byimana", "Isangano", "Karambi", "Kiyovu"] },
          { name: "Nyamirama", cells: ["Gikaya", "Musumba", "Rurambi", "Shyogo"] },
          { name: "Rukara", cells: ["Kawangire", "Rukara", "Rwimishinya"] },
          { name: "Ruramira", cells: ["Bugambira", "Nkamba", "Ruyonza", "Umubuga"] },
          { name: "Rwinkwavu", cells: ["Gihinga", "Mbarara", "Mukoyoyo", "Nkondo"] }
        ]
      },
      {
        name: "Kirehe",
        sectors: [
          { name: "Gahara", cells: ["Butezi", "Muhamba", "Murehe", "Nyagasenyi", "Nyakagezi", "Rubimba"] },
          { name: "Gatore", cells: ["Curazo", "Cyunuzi", "Muganza", "Nyamiryango", "Rwabutazi", "Rwantonde"] },
          { name: "Kigarama", cells: ["Cyanya", "Kigarama", "Kiremera", "Nyakerera", "Nyankurazo"] },
          { name: "Kigina", cells: ["Gatarama", "Rugarama", "Ruhanga", "Rwanteru"] },
          { name: "Kirehe", cells: ["Gahama", "Kirehe", "Nyabigega", "Nyabikokora", "Rwesero"] },
          { name: "Mahama", cells: ["Kamonbo", "Munini", "Mwoga", "Saruhembe", "Umunini"] },
          { name: "Mpanga", cells: ["Bwiyorere", "Kankobwa", "Mpanga", "Mushongi", "Nasho", "Nyakabungo", "Rubaya"] },
          { name: "Musaza", cells: ["Gasarabwayi", "Kabuga", "Mubuga", "Musaza", "Nganda"] },
          { name: "Mushikiri", cells: ["Bisagara", "Cyamigurwa", "Rugarama", "Rwanyamuhanga", "Rwayikona"] },
          { name: "Nasho", cells: ["Cyambwe", "Kagese", "Ntaruka", "Rubirizi", "Ruboma"] },
          { name: "Nyamugari", cells: ["Bukora", "Kagasa", "Kazizi", "Kiyanzi", "Nyamugari"] },
          { name: "Nyarubuye", cells: ["Mareba", "Nyabitare", "Nyarutunga"] }
        ]
      },
      {
        name: "Ngoma",
        sectors: [
          { name: "Gashanda", cells: ["Cyerwa", "Giseri", "Munege", "Mutsindo"] },
          { name: "Jarama", cells: ["Ihanika", "Jarama", "Karenge", "Kibimba", "Kigoma"] },
          { name: "Karembo", cells: ["Akaziba", "Karaba", "Nyamirambo"] },
          { name: "Kazo", cells: ["Birenga", "Gahurire", "Karama", "Kinyonzo", "Umukamba"] },
          { name: "Kibungo", cells: ["Cyasemakamba", "Gahima", "Gatonde", "Karenge", "Mahango"] },
          { name: "Mugesera", cells: ["Akabungo", "Mugatare", "Ntanga", "Nyamugari", "Nyange"] },
          { name: "Murama", cells: ["Gitaraga", "Kigabiro", "Mvumba", "Rurenge", "Sakara"] },
          { name: "Mutenderi", cells: ["Karwema", "Kibare", "Mutenderi", "Muzingira", "Nyagasozi"] },
          { name: "Remera", cells: ["Bugera", "Kinunga", "Ndekwe", "Nyamagana"] },
          { name: "Rukira", cells: ["Buliba", "Kibatsi", "Nyaruvumu", "Nyinya"] },
          { name: "Rukumberi", cells: ["Gituza", "Ntovi", "Rubago", "Rubona", "Rwintashya"] },
          { name: "Rurenge", cells: ["Akagarama", "Muhurire", "Musya", "Rugese", "Rujambara", "Rwikubo"] },
          { name: "Sake", cells: ["Gafunzo", "Kibonde", "Nkanga", "Rukoma"] },
          { name: "Zaza", cells: ["Nyagasozi", "Nyagatugunda", "Ruhembe", "Ruhinga"] }
        ]
      },
      {
        name: "Nyagatare",
        sectors: [
          { name: "Gatunda", cells: ["Cyagaju", "Kabeza", "Nyamikamba", "Nyamirembe", "Nyangara", "Nyarurema", "Rwensheke"] },
          { name: "Karama", cells: ["Bushara", "Cyenkwanzi", "Gikagati", "Gikundamvura", "Kabuga", "Ndego", "Nyakiga"] },
          { name: "Karangazi", cells: ["Kamate", "Karama", "Kizirakome", "Mbare", "Musenyi", "Ndama", "Nyagashanga", "Nyamirama", "Rubagabaga", "Rwenyemera", "Rwisirabo"] },
          { name: "Katabagemu", cells: ["Bayigaburire", "Kaduha", "Kanyeganyege", "Katabagemu", "Kigarama", "Nyakigando", "Rubira", "Rugazi", "Rutoma"] },
          { name: "Kiyombe", cells: ["Gataba", "Gitenga", "Kabungo", "Karambo", "Karujumba", "Tovu"] },
          { name: "Matimba", cells: ["Bwera", "Byimana", "Cyembogo", "Kagitumba", "Kanyonza", "Matimba", "Nyabwishongwezi", "Rwentanga"] },
          { name: "Mimuri", cells: ["Bibare", "Gakoma", "Mahoro", "Mimuri", "Rugari"] },
          { name: "Mukama", cells: ["Bufunda", "Gatete", "Gihengeri", "Gishororo", "Kagina", "Rugarama"] },
          { name: "Musheri", cells: ["Kibirizi", "Kijojo", "Musheri", "Ntoma", "Nyagatabire", "Nyamiyonga", "Rugarama I", "Rugarama II"] },
          { name: "Nyagatare", cells: ["Barija", "Bushoga", "Cyabayaga", "Gakirage", "Kamagiri", "Nsheke", "Nyagatare", "Rutaraka", "Ryabega"] },
          { name: "Rukomo", cells: ["Gahurura", "Gashenyi", "Nyakagarama", "Rukomo II", "Rurenge"] },
          { name: "Rwempasha", cells: ["Cyenjonjo", "Gasinga", "Kabare", "Kazaza", "Mishenyi", "Rugarama", "Rukorota", "Rutare", "Rwempasha", "Ryeru"] },
          { name: "Rwimiyaga", cells: ["Gacundezi", "Kabeza", "Kirebe", "Ntoma", "Nyarupfubire", "Nyendo", "Rutungu", "Rwimiyaga"] },
          { name: "Tabagwe", cells: ["Gishuro", "Gitengure", "Nkoma", "Nyabitekeri", "Nyagatoma", "Shonga", "Tabagwe"] }
        ]
      },
      {
        name: "Rwamagana",
        sectors: [
          { name: "Fumbwe", cells: ["Mununu", "Nyagasambu", "Nyakagunga", "Nyamirama", "Nyarubuye", "Sasabirago"] },
          { name: "Gahengeri", cells: ["Gihumuza", "Kagezi", "Kanyangese", "Kibare", "Mutamwa", "Rugarama", "Runyinya", "Rweri"] },
          { name: "Gishari", cells: ["Binunga", "Bwinsanga", "Cyinyana", "Gati", "Kavumu", "Ruhimbi", "Ruhunda"] },
          { name: "Karenge", cells: ["Bicaca", "Byimana", "Kabasore", "Kangamba", "Karenge", "Nyabubare", "Nyamatete"] },
          { name: "Kigabiro", cells: ["Bwiza", "Cyanya", "Nyagasenyi", "Sibagire", "Sovu"] },
          { name: "Muhazi", cells: ["Byeza", "Kabare", "Karambi", "Karitutu", "Kitazigurwa", "Murambi", "Nsinda", "Ntebe", "Nyarusange"] },
          { name: "Munyaga", cells: ["Kaduha", "Nkungu", "Rweru", "Zinga"] },
          { name: "Munyiginya", cells: ["Binunga", "Bwana", "Cyarukamba", "Cyimbazi", "Nkomangwa", "Nyarubuye"] },
          { name: "Musha", cells: ["Akabare", "Budahanda", "Kagarama", "Musha", "Nyabisindu", "Nyakabanda"] },
          { name: "Muyumbu", cells: ["Akinyambo", "Bujyujyu", "Murehe", "Ntebe", "Nyarukombe"] },
          { name: "Mwulire", cells: ["Bicumbi", "Bushenyi", "Mwulire", "Ntunga"] },
          { name: "Nyakariro", cells: ["Bihembe", "Gatare", "Gishore", "Munini", "Rwimbogo"] },
          { name: "Nzige", cells: ["Akanzu", "Kigarama", "Murama", "Rugarama"] },
          { name: "Rubona", cells: ["Byinza", "Kabatasi", "Kabuye", "Karambi", "Mabare", "Nawe"] }
        ]
      }
    ]
  },
  {
    name: "Kigali",
    districts: [
      {
        name: "Gasabo",
        sectors: [
          { name: "Bumbogo", cells: ["Kinyaga", "Musave", "Mvuzo", "Ngara", "Nkuzuzu", "Nyabikenke", "Nyagasozi"] },
          { name: "Gatsata", cells: ["Karuruma", "Nyamabuye", "Nyamugari"] },
          { name: "Gikomero", cells: ["Gasagara", "Gicaca", "Kibara", "Munini", "Murambi"] },
          { name: "Gisozi", cells: ["Musezero", "Ruhango"] },
          { name: "Jabana", cells: ["Akamatamu", "Bweramvura", "Kabuye", "Kidashya", "Ngiryi"] },
          { name: "Jali", cells: ["Agateko", "Buhiza", "Muko", "Nkusi", "Nyabuliba", "Nyakabungo", "Nyamitanga"] },
          { name: "Kacyiru", cells: ["Kamatamu", "Kamutwa", "Kibaza"] },
          { name: "Kimihurura", cells: ["Kamukina", "Kimihurura", "Rugando"] },
          { name: "Kimironko", cells: ["Bibare", "Kibagabaga", "Nyagatovu"] },
          { name: "Kinyinya", cells: ["Gacuriro", "Gasharu", "Kagugu", "Murama"] },
          { name: "Ndera", cells: ["Bwiza", "Cyaruzinge", "Kibenga", "Masoro", "Mukuyu", "Rudashya"] },
          { name: "Nduba", cells: ["Butare", "Gasanze", "Gasura", "Gatunga", "Muremure", "Sha", "Shango"] },
          { name: "Remera", cells: ["Nyabisindu", "Nyarutarama", "Rukiri I", "Rukiri II"] },
          { name: "Rusororo", cells: ["Bisenga", "Gasagara", "Kabuga I", "Kabuga II", "Kinyana", "Mbandazi", "Nyagahinga", "Ruhanga"] },
          { name: "Rutunga", cells: ["Gasabo", "Indatemwa", "Kabaliza", "Kacyatwa", "Kibenga", "Kigabiro"] }
        ]
      },
      {
        name: "Kicukiro",
        sectors: [
          { name: "Gahanga", cells: ["Gahanga", "Kagasa", "Karembure", "Murinja", "Nunga", "Rwabutenge"] },
          { name: "Gatenga", cells: ["Gatenga", "Karambo", "Nyanza", "Nyarurama"] },
          { name: "Gikondo", cells: ["Kagunga", "Kanserege", "Kinunga"] },
          { name: "Kagarama", cells: ["Kanserege", "Muyange", "Rukatsa"] },
          { name: "Kanombe", cells: ["Busanza", "Kabeza", "Karama", "Rubirizi"] },
          { name: "Kicukiro", cells: ["Gasharu", "Kagina", "Kicukiro", "Ngoma"] },
          { name: "Kigarama", cells: ["Bwerankori", "Karugira", "Kigarama", "Nyarurama", "Rwampara"] },
          { name: "Masaka", cells: ["Ayabaraya", "Cyimo", "Gako", "Gitaraga", "Mbabe", "Rusheshe"] },
          { name: "Niboye", cells: ["Gatare", "Niboye", "Nyakabanda"] },
          { name: "Nyarugunga", cells: ["Kamashashi", "Nonko", "Rwimbogo"] }
        ]
      },
      {
        name: "Nyarugenge",
        sectors: [
          { name: "Gitega", cells: ["Akabahizi", "Akabeza", "Gacyamo", "Kigarama", "Kinyange", "Kora"] },
          { name: "Kanyinya", cells: ["Nyamweru", "Nzove", "Taba"] },
          { name: "Kigali", cells: ["Kigali", "Mwendo", "Nyabugogo", "Ruriba", "Rwesero"] },
          { name: "Kimisagara", cells: ["Kamuhoza", "Katabaro", "Kimisagara"] },
          { name: "Mageragere", cells: ["Kankuba", "Kavumu", "Mataba", "Ntungamo", "Nyarufunzo", "Nyarurenzi", "Runzenze"] },
          { name: "Muhima", cells: ["Amahoro", "Kabasengerezi", "Kabeza", "Nyabugogo", "Rugenge", "Tetero", "Ubumwe"] },
          { name: "Nyakabanda", cells: ["Munanira I", "Munanira II", "Nyakabanda I", "Nyakabanda II"] },
          { name: "Nyamirambo", cells: ["Cyivugiza", "Gasharu", "Mumena", "Rugarama"] },
          { name: "Nyarugenge", cells: ["Agatare", "Biryogo", "Kiyovu", "Rwampara"] },
          { name: "Rwezamenyo", cells: ["Kabuguru I", "Kabuguru II", "Rwezamenyo I", "Rwezamenyo II"] }
        ]
      }
    ]
  },
  {
    name: "North",
    districts: [
      {
        name: "Burera",
        sectors: [
          { name: "Bungwe", cells: ["Bungwe", "Bushenya", "Mudugari", "Tumba"] },
          { name: "Butaro", cells: ["Gatsibo", "Mubuga", "Muhotora", "Nyamicucu", "Rusumo"] },
          { name: "Cyanika", cells: ["Gasiza", "Gisovu", "Kabyiniro", "Kagitega", "Kamanyana", "Nyagahinga"] },
          { name: "Cyeru", cells: ["Butare", "Ndongozi", "Ruyange"] },
          { name: "Gahunga", cells: ["Buramba", "Gisizi", "Kidakama", "Nyangwe", "Rwasa"] },
          { name: "Gatebe", cells: ["Gabiro", "Musenda", "Rwambogo", "Rwasa"] },
          { name: "Gitovu", cells: ["Mariba", "Musasa", "Runoga"] },
          { name: "Kagogo", cells: ["Kabaya", "Kayenzi", "Kiringa", "Nyamabuye"] },
          { name: "Kinoni", cells: ["Gafuka", "Nkenke", "Nkumba", "Ntaruka"] },
          { name: "Kinyababa", cells: ["Bugamba", "Kaganda", "Musasa", "Rutovu"] },
          { name: "Kivuye", cells: ["Bukwashuri", "Gashanje", "Murwa", "Nyirataba"] },
          { name: "Nemba", cells: ["Kivumu", "Nyamugari", "Rubona", "Rushara"] },
          { name: "Rugarama", cells: ["Cyahi", "Gafumba", "Karangara", "Rurembo"] },
          { name: "Rugengabari", cells: ["Kilibata", "Mucaca", "Nyanamo", "Rukandabyuma"] },
          { name: "Ruhunde", cells: ["Gaseke", "Gatare", "Gitovu", "Rusekera"] },
          { name: "Rusarabuye", cells: ["Kabona", "Ndago", "Ruhanga"] },
          { name: "Rwerere", cells: ["Gacundura", "Gashoro", "Ruconsho", "Rugari"] }
        ]
      },
      {
        name: "Gakenke",
        sectors: [
          { name: "Busengo", cells: ["Birambo", "Butereri", "Byibuhiro", "Kamina", "Kirabo", "Mwumba", "Ruhanga"] },
          { name: "Coko", cells: ["Kiruku", "Mbirima", "Nyange", "Nyanza"] },
          { name: "Cyabingo", cells: ["Muhaza", "Muhororo", "Muramba", "Mutanda", "Rukore"] },
          { name: "Gakenke", cells: ["Buheta", "Kagoma", "Nganzo", "Rusagara"] },
          { name: "Gashenyi", cells: ["Nyacyina", "Rukura", "Rutabo", "Rutenderi", "Taba"] },
          { name: "Janja", cells: ["Gakindo", "Gashyamba", "Gatwa", "Karukungu"] },
          { name: "Kamubuga", cells: ["Kamubuga", "Kidomo", "Mbatabata", "Rukore"] },
          { name: "Karambo", cells: ["Kanyanza", "Karambo", "Kirebe"] },
          { name: "Kivuruga", cells: ["Cyintare", "Gasiza", "Rugimbu", "Ruhinga", "Sereri"] },
          { name: "Mataba", cells: ["Buyange", "Gikombe", "Nyundo"] },
          { name: "Minazi", cells: ["Gasiho", "Munyana", "Murambi", "Raba"] },
          { name: "Mugunga", cells: ["Gahinga", "Munyana", "Mutego", "Nkomane", "Rutabo", "Rutenderi", "Rwamambe"] },
          { name: "Muhondo", cells: ["Busake", "Bwenda", "Gasiza", "Gihinga", "Huro", "Musagara", "Musenyi", "Ruganda", "Rwinkuba"] },
          { name: "Muyongwe", cells: ["Bumba", "Gisiza", "Karyango", "Nganzo", "Va"] },
          { name: "Muzo", cells: ["Kabatezi", "Kiryamo", "Mubuga", "Mwiyando", "Rwa"] },
          { name: "Nemba", cells: ["Buranga", "Gahinga", "Gisozi", "Mucaca"] },
          { name: "Ruli", cells: ["Busoro", "Gikingo", "Jango", "Ruli", "Rwesero"] },
          { name: "Rusasa", cells: ["Gataba", "Kamonyi", "Murambi", "Nyundo", "Rumbi", "Rurembo"] },
          { name: "Rushashi", cells: ["Burimba", "Busanane", "Joma", "Kageyo", "Mbogo", "Razi", "Rwankuba", "Shyombwe"] }
        ]
      },
      {
        name: "Gicumbi",
        sectors: [
          { name: "Bukure", cells: ["Karenge", "Kigabiro", "Kivumu", "Rwesero"] },
          { name: "Bwisige", cells: ["Bwisige", "Gihuke", "Mukono", "Nyabushingitwa"] },
          { name: "Byumba", cells: ["Gacurabwenge", "Gisuna", "Kibali", "Kivugiza", "Murama", "Ngondore", "Nyakabungo", "Nyamabuye", "Nyarutarama"] },
          { name: "Cyumba", cells: ["Gasunzu", "Muhambo", "Nyakabungo", "Nyambare", "Nyaruka", "Rwankonjo"] },
          { name: "Giti", cells: ["Gatobotobo", "Murehe", "Tanda"] },
          { name: "Kaniga", cells: ["Gihembe", "Horezo", "Kabuga", "Muhondo", "Nyamiyaga"] },
          { name: "Manyagiro", cells: ["Bugomba", "Gatoma", "Mulindi", "Nyarwambu", "Rukurura"] },
          { name: "Miyove", cells: ["Kabuga", "Nyiragifumba", "Nyiravugiza", "Remera", "Rusekera", "Ryaruyumba"] },
          { name: "Mukarange", cells: ["Gakenke", "Miyove", "Mubuga"] },
          { name: "Muko", cells: ["Cyamuganga", "Gatenga", "Kiruhura", "Mutarama", "Rugerero", "Rusambya"] },
          { name: "Mutete", cells: ["Cyamuhinda", "Kigoma", "Mwendo", "Ngange", "Rebero"] },
          { name: "Nyamiyaga", cells: ["Gaseke", "Kabeza", "Musenyi", "Mutandi", "Nyarubuye"] },
          { name: "Nyankenke", cells: ["Gahumuliza", "Jamba", "Kabeza", "Kabuga", "Karambo", "Kiziba", "Mataba"] },
          { name: "Rubaya", cells: ["Butare", "Kigogo", "Kinishya", "Rusasa", "Rutete", "Rwagihura", "Yaramba"] },
          { name: "Rukomo", cells: ["Gihanga", "Gishambashayo", "Gishari", "Muguramo", "Nyamiyaga"] },
          { name: "Rushaki", cells: ["Cyeya", "Cyuru", "Gisiza", "Kinyami", "Mabare", "Munyinya"] },
          { name: "Rutare", cells: ["Gitega", "Kamutora", "Karurama"] },
          { name: "Ruvune", cells: ["Bikumba", "Gasharu", "Gatwaro", "Kigabiro", "Munanira", "Nkoto"] },
          { name: "Rwamiko", cells: ["Cyandaro", "Gasambya", "Gashirira", "Kabare", "Rebero", "Ruhondo"] },
          { name: "Shangasha", cells: ["Cyeru", "Kigabiro", "Nyagahinga"] }
        ]
      },
      {
        name: "Musanze",
        sectors: [
          { name: "Busogo", cells: ["Gisesero", "Kavumu", "Nyagisozi", "Sahara"] },
          { name: "Cyuve", cells: ["Bukinanyana", "Buruba", "Cyanya", "Kabeza", "Migeshi", "Rwebeya"] },
          { name: "Gacaca", cells: ["Gakoro", "Gasakuza", "Kabirizi", "Karwasa"] },
          { name: "Gashaki", cells: ["Kigabiro", "Kivumu", "Mbwe", "Muharuro"] },
          { name: "Gataraga", cells: ["Mudakama", "Murago", "Rubindi", "Rungu"] },
          { name: "Kimonyi", cells: ["Birira", "Buramira", "Kivumu", "Mbizi"] },
          { name: "Kinigi", cells: ["Bisoke", "Kaguhu", "Kampanga", "Nyabigoma", "Nyonirima"] },
          { name: "Muhoza", cells: ["Cyabararika", "Kigombe", "Mpenge", "Ruhengeri"] },
          { name: "Muko", cells: ["Cyivugiza", "Cyogo", "Mburabuturo", "Songa"] },
          { name: "Musanze", cells: ["Cyabagarura", "Garuka", "Kabazungu", "Nyarubuye", "Rwambogo"] },
          { name: "Nkotsi", cells: ["Bikara", "Gashinga", "Mubago", "Rugeshi", "Ruyumba"] },
          { name: "Nyange", cells: ["Cyivugiza", "Kabeza", "Kamwumba", "Muhabura", "Ninda"] },
          { name: "Remera", cells: ["Gasongero", "Kamisave", "Murandi", "Murwa", "Rurambo"] },
          { name: "Rwaza", cells: ["Bumara", "Kabushinge", "Musezero", "Nturo", "Nyarubuye"] },
          { name: "Shingiro", cells: ["Gakingo", "Kibuguzo", "Mudende", "Mugari"] }
        ]
      },
      {
        name: "Rulindo",
        sectors: [
          { name: "Base", cells: ["Cyohoha", "Gitare", "Rwamahwa"] },
          { name: "Burega", cells: ["Butangampundu", "Karengeri", "Taba"] },
          { name: "Bushoki", cells: ["Gasiza", "Giko", "Kayenzi", "Mukoto", "Nyirangarama"] },
          { name: "Buyoga", cells: ["Busoro", "Butare", "Gahororo", "Gitumba", "Karama", "Mwumba", "Ndarage"] },
          { name: "Cyinzuzi", cells: ["Budakiranya", "Migendezo", "Rudogo"] },
          { name: "Cyungo", cells: ["Burehe", "Marembo", "Rwili"] },
          { name: "Kinihira", cells: ["Butunzi", "Karegamazi", "Marembo", "Rebero"] },
          { name: "Kisaro", cells: ["Gitatsa", "Kamushenyi", "Kigarama", "Mubuga", "Murama", "Sayo"] },
          { name: "Masoro", cells: ["Kabuga", "Kigarama", "Kivugiza", "Nyamyumba", "Shengampuli"] },
          { name: "Mbogo", cells: ["Bukoro", "Mushari", "Ngiramazi", "Rurenge"] },
          { name: "Murambi", cells: ["Bubangu", "Gatwa", "Mugambazi", "Mvuzo"] },
          { name: "Ngoma", cells: ["Kabuga", "Karambo", "Mugote", "Munyarwanda"] },
          { name: "Ntarabana", cells: ["Kajevuba", "Kiyanza", "Mahaza"] },
          { name: "Rukozo", cells: ["Buraro", "Bwimo", "Mberuka", "Mbuye"] },
          { name: "Rusiga", cells: ["Gako", "Kirenge", "Taba"] },
          { name: "Shyorongi", cells: ["Bugaragara", "Kijabagwe", "Muvumu", "Rubona", "Rutonde"] },
          { name: "Tumba", cells: ["Barari", "Gahabwa", "Misezero", "Nyirabirori", "Taba"] }
        ]
      }
    ]
  },
  {
    name: "South",
    districts: [
      {
        name: "Gisagara",
        sectors: [
          { name: "Gikonko", cells: ["Cyiri", "Gasagara", "Gikonko", "Mbogo"] },
          { name: "Gishubi", cells: ["Gabiro", "Nyabitare", "Nyakibungo", "Nyeranzi"] },
          { name: "Kansi", cells: ["Akaboti", "Bwiza", "Sabusaro", "Umunini"] },
          { name: "Kibilizi", cells: ["Duwani", "Kibirizi", "Muyira", "Ruturo"] },
          { name: "Kigembe", cells: ["Agahabwa", "Gatovu", "Impinga", "Nyabikenke", "Rubona", "Rusagara"] },
          { name: "Mamba", cells: ["Gakoma", "Kabumbwe", "Mamba", "Muyaga", "Ramba"] },
          { name: "Muganza", cells: ["Cyumba", "Muganza", "Remera", "Rwamiko", "Saga"] },
          { name: "Mugombwa", cells: ["Baziro", "Kibayi", "Kibu", "Mugombwa", "Mukomacara"] },
          { name: "Mukindo", cells: ["Gitega", "Mukiza", "Nyabisagara", "Runyinya"] },
          { name: "Musha", cells: ["Bukinanyana", "Gatovu", "Kigarama", "Kimana"] },
          { name: "Ndora", cells: ["Bweya", "Cyamukuza", "Dahwe", "Gisagara", "Mukande"] },
          { name: "Nyanza", cells: ["Higiro", "Nyamugari", "Nyaruteja", "Umubanga"] },
          { name: "Save", cells: ["Gatoki", "Munazi", "Rwanza", "Shyanda", "Zivu"] }
        ]
      },
      {
        name: "Huye",
        sectors: [
          { name: "Gishamvu", cells: ["Nyakibanda", "Nyumba", "Ryakibogo", "Shori"] },
          { name: "Huye", cells: ["Muyogoro", "Nyakagezi", "Rukira", "Sovu"] },
          { name: "Karama", cells: ["Buhoro", "Bunazi", "Gahororo", "Kibingo", "Muhembe"] },
          { name: "Kigoma", cells: ["Gishihe", "Kabatwa", "Kabuga", "Karambi", "Musebeya", "Nyabisindu", "Rugarama", "Shanga"] },
          { name: "Kinazi", cells: ["Byinza", "Gahana", "Gitovu", "Kabona", "Sazange"] },
          { name: "Maraba", cells: ["Buremera", "Gasumba", "Kabuye", "Kanyinya", "Shanga", "Shyembe"] },
          { name: "Mbazi", cells: ["Gatobotobo", "Kabuga", "Mutunda", "Mwulire", "Rugango", "Rusagara", "Tare"] },
          { name: "Mukura", cells: ["Bukomeye", "Buvumu", "Icyeru", "Rango A"] },
          { name: "Ngoma", cells: ["Butare", "Kaburemera", "Matyazo", "Ngoma"] },
          { name: "Ruhashya", cells: ["Busheshi", "Gatovu", "Karama", "Mara", "Muhororo", "Rugogwe", "Ruhashya"] },
          { name: "Rusatira", cells: ["Buhimba", "Gafumba", "Kimirehe", "Kimuna", "Kiruhura", "Mugogwe"] },
          { name: "Rwaniro", cells: ["Gatwaro", "Kamwambi", "Kibiraro", "Mwendo", "Nyamabuye", "Nyaruhombo", "Shyunga"] },
          { name: "Simbi", cells: ["Cyendajuru", "Gisakura", "Kabusanza", "Mugobore", "Nyangazi"] },
          { name: "Tumba", cells: ["Cyarwa", "Cyimana", "Gitwa", "Mpare", "Rango B"] }
        ]
      },
      {
        name: "Kamonyi",
        sectors: [
          { name: "Gacurabwenge", cells: ["Gihinga", "Gihira", "Kigembe", "Nkingo"] },
          { name: "Karama", cells: ["Bitare", "Bunyonga", "Muganza", "Nyamirembe"] },
          { name: "Kayenzi", cells: ["Bugarama", "Cubi", "Kayonza", "Kirwa", "Mataba", "Nyamirama"] },
          { name: "Kayumbu", cells: ["Busoro", "Gaseke", "Giko", "Muyange"] },
          { name: "Mugina", cells: ["Jenda", "Kabugondo", "Mbati", "Mugina", "Nteko"] },
          { name: "Musambira", cells: ["Buhoro", "Cyambwe", "Karengera", "Kivumu", "Mpushi", "Rukambura"] },
          { name: "Ngamba", cells: ["Kabuga", "Kazirabonde", "Marembo"] },
          { name: "Nyamiyaga", cells: ["Bibungo", "Kabashumba", "Kidahwe", "Mukinga", "Ngoma"] },
          { name: "Nyarubaka", cells: ["Gitare", "Kambyeyi", "Kigusa", "Nyagishubi", "Ruyanza"] },
          { name: "Rugarika", cells: ["Bihembe", "Kigese", "Masaka", "Nyarubuye", "Sheli"] },
          { name: "Rukoma", cells: ["Bugoba", "Buguri", "Gishyeshye", "Murehe", "Mwirute", "Remera", "Taba"] },
          { name: "Runda", cells: ["Gihara", "Kabagesera", "Kagina", "Muganza", "Ruyenzi"] }
        ]
      },
      {
        name: "Muhanga",
        sectors: [
          { name: "Cyeza", cells: ["Biringaga", "Kigarama", "Kivumu", "Makera", "Nyarunyinya", "Shori"] },
          { name: "Kabacuzi", cells: ["Buramba", "Butare", "Kabuye", "Kavumu", "Kibyimba", "Ngarama", "Ngoma", "Sholi"] },
          { name: "Kibangu", cells: ["Gisharu", "Gitega", "Jurwe", "Mubuga", "Rubyiniro", "Ryakanimba"] },
          { name: "Kiyumba", cells: ["Budende", "Ndago", "Remera", "Ruhina", "Rukeri"] },
          { name: "Muhanga", cells: ["Kanyinya", "Nganzo", "Nyamirama", "Remera", "Tyazo"] },
          { name: "Mushishiro", cells: ["Matyazo", "Munazi", "Nyagasozi", "Rukaragata", "Rwasare", "Rwigerero"] },
          { name: "Nyabinoni", cells: ["Gashorera", "Masangano", "Mbuga", "Muvumba", "Nyarusozi"] },
          { name: "Nyamabuye", cells: ["Gahogo", "Gifumba", "Gitarama", "Remera"] },
          { name: "Nyarusange", cells: ["Mbiriri", "Musongati", "Ngaru", "Rusovu"] },
          { name: "Rongi", cells: ["Gasagara", "Gasharu", "Karambo", "Nyamirambo", "Ruhango"] },
          { name: "Rugendabari", cells: ["Gasave", "Kanyana", "Kibaga", "Mpinga", "Nsanga"] },
          { name: "Shyogwe", cells: ["Kinini", "Mbare", "Mubuga", "Ruli"] }
        ]
      },
      {
        name: "Nyamagabe",
        sectors: [
          { name: "Buruhukiro", cells: ["Bushigishigi", "Byimana", "Gifurwe", "Kizimyamuriro", "Munini", "Rambya"] },
          { name: "Cyanika", cells: ["Gitega", "Karama", "Kiyumba", "Ngoma", "Nyanza", "Nyanzoga"] },
          { name: "Gasaka", cells: ["Kigeme", "Ngiryi", "Nyabivumu", "Nyamugari", "Nzega", "Remera"] },
          { name: "Gatare", cells: ["Bakopfu", "Gatare", "Mukongoro", "Ruganda", "Shyeru"] },
          { name: "Kaduha", cells: ["Kavumu", "Murambi", "Musenyi", "Nyabisindu", "Nyamiyaga"] },
          { name: "Kamegeri", cells: ["Bwama", "Kamegeri", "Kirehe", "Kizi", "Nyarusiza", "Rususa"] },
          { name: "Kibirizi", cells: ["Bugarama", "Bugarura", "Gashiha", "Karambo", "Ruhunga", "Uwindekezi"] },
          { name: "Kibumbwe", cells: ["Bwenda", "Gakanka", "Kibibi", "Nyakiza"] },
          { name: "Kitabi", cells: ["Kagano", "Mujuga", "Mukungu", "Shaba", "Uwingugu"] },
          { name: "Mbazi", cells: ["Manwari", "Mutiwingoma", "Ngambi", "Ngara"] },
          { name: "Mugano", cells: ["Gitondorero", "Gitwa", "Ruhinga", "Sovu", "Suti", "Yonde"] },
          { name: "Musange", cells: ["Gasave", "Jenda", "Masagara", "Masangano", "Masizi", "Nyagisozi"] },
          { name: "Musebeya", cells: ["Gatovu", "Nyarurambi", "Rugano", "Runege", "Rusekera", "Sekera"] },
          { name: "Mushubi", cells: ["Buteteri", "Cyobe", "Gashwati"] },
          { name: "Nkomane", cells: ["Bitandara", "Musaraba", "Mutengeri", "Nkomane", "Nyarwungo", "Twiya"] },
          { name: "Tare", cells: ["Buhoro", "Gasarenda", "Gatovu", "Kaganza", "Nkumbure", "Nyamigina"] },
          { name: "Uwinkingi", cells: ["Bigumira", "Gahira", "Kibyagira", "Mudasomwa", "Munyege", "Rugogwe"] }
        ]
      },
      {
        name: "Nyanza",
        sectors: [
          { name: "Busasamana", cells: ["Gahondo", "Kavumu", "Kibinja", "Nyanza", "Rwesero"] },
          { name: "Busoro", cells: ["Gitovu", "Kimirama", "Masangano", "Munyinya", "Rukingiro", "Shyira"] },
          { name: "Cyabakamyi", cells: ["Kadaho", "Karama", "Nyabinyenga", "Nyarurama", "Rubona"] },
          { name: "Kibilizi", cells: ["Cyeru", "Mbuye", "Mututu", "Rwotso"] },
          { name: "Kigoma", cells: ["Butansinda", "Butara", "Gahombo", "Gasoro", "Mulinja"] },
          { name: "Mukingo", cells: ["Cyerezo", "Gatagara", "Kiruli", "Mpanga", "Ngwa", "Nkomero"] },
          { name: "Muyira", cells: ["Gati", "Migina", "Nyamiyaga", "Nyamure", "Nyundo"] },
          { name: "Ntyazo", cells: ["Bugali", "Cyotamakara", "Kagunga", "Katarara"] },
          { name: "Nyagisozi", cells: ["Gahunga", "Kabirizi", "Kabuga", "Kirambi", "Rurangazi"] },
          { name: "Rwabicuma", cells: ["Gacu", "Gishike", "Mubuga", "Mushirarungu", "Nyarusange", "Runga"] }
        ]
      },
      {
        name: "Nyaruguru",
        sectors: [
          { name: "Busanze", cells: ["Kirarangombe", "Nkanda", "Nteko", "Runyombyi", "Shororo"] },
          { name: "Cyahinda", cells: ["Coko", "Cyahinda", "Gasasa", "Muhambara", "Rutobwe"] },
          { name: "Kibeho", cells: ["Gakoma", "Kibeho", "Mbasa", "Mpanda", "Mubuga", "Nyange"] },
          { name: "Kivu", cells: ["Cyanyirankora", "Gahurizo", "Kimina", "Kivu", "Rugerero"] },
          { name: "Mata", cells: ["Gorwe", "Murambi", "Nyamabuye", "Ramba", "Rwamiko"] },
          { name: "Muganza", cells: ["Muganza", "Rukore", "Samiyonga", "Uwacyiza"] },
          { name: "Munini", cells: ["Giheta", "Ngarurira", "Ngeri", "Ntwali", "Nyarure"] },
          { name: "Ngera", cells: ["Bitare", "Mukuge", "Murama", "Nyamirama", "Nyanza", "Yaramba"] },
          { name: "Ngoma", cells: ["Fugi", "Kibangu", "Kiyonza", "Mbuye", "Nyamirama", "Rubona"] },
          { name: "Nyabimata", cells: ["Gihemvu", "Kabere", "Mishungero", "Nyabimata", "Ruhinga"] },
          { name: "Nyagisozi", cells: ["Maraba", "Mwoya", "Nkakwa", "Nyagisozi"] },
          { name: "Ruheru", cells: ["Gitita", "Kabere", "Remera", "Ruyenzi", "Uwumusebeya"] },
          { name: "Ruramba", cells: ["Gabiro", "Giseke", "Nyarugano", "Rugogwe", "Ruramba"] },
          { name: "Rusenge", cells: ["Bunge", "Cyuna", "Gikunzi", "Mariba", "Raranzige", "Rusenge"] }
        ]
      },
      {
        name: "Ruhango",
        sectors: [
          { name: "Bweramana", cells: ["Buhanda", "Gitisi", "Murama", "Rubona", "Rwinyana"] },
          { name: "Byimana", cells: ["Kamusenyi", "Kirengeri", "Mahembe", "Mpanda", "Muhororo", "Ntenyo", "Nyakabuye"] },
          { name: "Kabagali", cells: ["Bihembe", "Karambi", "Munanira", "Remera", "Rwesero", "Rwoga"] },
          { name: "Kinazi", cells: ["Burima", "Gisali", "Kinazi", "Rubona", "Rutabo"] },
          { name: "Kinihira", cells: ["Bweramvura", "Gitinda", "Kirwa", "Muyunzwe", "Nyakogo", "Rukina"] },
          { name: "Mbuye", cells: ["Cyanza", "Gisanga", "Kabuga", "Kizibere", "Mbuye", "Mwendo", "Nyakarekare"] },
          { name: "Mwendo", cells: ["Gafunzo", "Gishweru", "Kamujisho", "Kigarama", "Kubutare", "Mutara", "Nyabibugu", "Saruheshyi"] },
          { name: "Ntongwe", cells: ["Gako", "Kareba", "Kayenzi", "Kebero", "Nyagisozi", "Nyakabungo", "Nyarurama"] },
          { name: "Ruhango", cells: ["Buhoro", "Bunyogombe", "Gikoma", "Munini", "Musamo", "Nyamagana", "Rwoga", "Tambwe"] }
        ]
      }
    ]
  },
  {
    name: "West",
    districts: [
      {
        name: "Karongi",
        sectors: [
          { name: "Bwishyura", cells: ["Burunga", "Gasura", "Gitarama", "Kayenzi", "Kibuye", "Kiniha", "Nyarusazi"] },
          { name: "Gashari", cells: ["Birambo", "Musasa", "Mwendo", "Rugobagoba", "Tongati"] },
          { name: "Gishyita", cells: ["Buhoro", "Cyanya", "Kigarama", "Munanira", "Musasa", "Ngoma"] },
          { name: "Gitesi", cells: ["Gasharu", "Gitega", "Kanunga", "Kirambo", "Munanira", "Nyamiringa", "Ruhinga", "Rwariro"] },
          { name: "Mubuga", cells: ["Kagabiro", "Murangara", "Nyagatovu", "Ryaruhanga"] },
          { name: "Murambi", cells: ["Mubuga", "Muhororo", "Nkoto", "Nyarunyinya", "Shyembe"] },
          { name: "Murundi", cells: ["Bukiro", "Kabaya", "Kamina", "Kareba", "Nyamushishi", "Nzaratsi"] },
          { name: "Mutuntu", cells: ["Byogo", "Gasharu", "Gisayura", "Kanyege", "Kinyonzwe", "Murengezo", "Rwufi"] },
          { name: "Rubengera", cells: ["Bubazi", "Gacaca", "Gisanze", "Gitwa", "Kibirizi", "Mataba", "Nyarugenge", "Ruragwe"] },
          { name: "Rugabano", cells: ["Gisiza", "Gitega", "Gitovu", "Kabuga", "Mubuga", "Mucyimba", "Rufungo", "Rwungo", "Tyazo"] },
          { name: "Ruganda", cells: ["Biguhu", "Kabingo", "Kinyovu", "Kivumu", "Nyabikeri", "Nyamugwagwa", "Rubona", "Rugobagoba"] },
          { name: "Rwankuba", cells: ["Bigugu", "Bisesero", "Gasata", "Munini", "Nyakamira", "Nyarusanga", "Rubazo", "Rubumba"] },
          { name: "Twumba", cells: ["Bihumbe", "Gakuta", "Gisovu", "Gitabura", "Kavumu", "Murehe", "Rutabi"] }
        ]
      },
      {
        name: "Ngororero",
        sectors: [
          { name: "Bwira", cells: ["Bungwe", "Cyahafi", "Gashubi", "Kabarondo", "Ruhindage"] },
          { name: "Gatumba", cells: ["Cyome", "Gatsibo", "Kamasiga", "Karambo", "Ruhanga", "Rusumo"] },
          { name: "Hindiro", cells: ["Gatare", "Gatega", "Kajinge", "Marantima", "Rugendabari", "Runyinya"] },
          { name: "Kageyo", cells: ["Busunzu", "Gaseke", "Kabaya", "Mwendo", "Ngoma", "Nyenyeri"] },
          { name: "Kavumu", cells: ["Kageshi", "Kirwa", "Mukore", "Muramba", "Nyamata", "Rwamamara"] },
          { name: "Matyazo", cells: ["Birembo", "Gitwa", "Murinzi", "Nyamugeyo", "Rugeshi", "Tetero"] },
          { name: "Muhanda", cells: ["Binana", "Gitega", "Matare", "Rutare", "Rwamiko"] },
          { name: "Muhororo", cells: ["Bugarura", "Gasiza", "Mashya", "Nganzo", "Ngoma", "Rutagara"] },
          { name: "Ndaro", cells: ["Bweramana", "Mubuga", "Myiha", "Rugogwe", "Rusororo", "Sanza"] },
          { name: "Ngororero", cells: ["Bijyojyo", "Bitabage", "Kabageshi", "Kibanda", "Kinyovi"] },
          { name: "Nyange", cells: ["Kaseke", "Kazabe", "Mugano", "Nyange", "Rususa", "Torero"] },
          { name: "Sovu", cells: ["Bambiro", "Gaseke", "Nsibo", "Vuganyana"] },
          { name: "Tyazo", cells: ["Birembo", "Kagano", "Kanyana", "Musenyi", "Nyabipfura", "Rutovu"] }
        ]
      },
      {
        name: "Nyabihu",
        sectors: [
          { name: "Bigogwe", cells: ["Arusha", "Basumba", "Kijote", "Kora", "Muhe", "Rega"] },
          { name: "Jenda", cells: ["Bukinanyana", "Gasizi", "Kabatezi", "Kareba", "Nyirakigugu", "Rega"] },
          { name: "Jomba", cells: ["Gasiza", "Gasura", "Gisizi", "Guriro", "Kavumu", "Nyamitanzi"] },
          { name: "Kabatwa", cells: ["Batikoti", "Cyamvumba", "Gihorwe", "Myuga", "Ngando", "Rugarama"] },
          { name: "Karago", cells: ["Busoro", "Cyamabuye", "Gatagara", "Gihirwa", "Kadahenda", "Karengera"] },
          { name: "Kintobo", cells: ["Gatovu", "Kintobo", "Nyagisozi", "Nyamugari", "Rukondo", "Ryinyo"] },
          { name: "Mukamira", cells: ["Gasizi", "Jaba", "Kanyove", "Rubaya", "Rugeshi", "Rukoma"] },
          { name: "Muringa", cells: ["Gisizi", "Mulinga", "Mwiyanike", "Nkomane", "Nyamasheke", "Rwantobo"] },
          { name: "Rambura", cells: ["Birembo", "Guriro", "Kibisabo", "Mutaho", "Nyundo", "Rugamba"] },
          { name: "Rugera", cells: ["Gakoro", "Marangara", "Nyagahondo", "Nyarutembe", "Rurembo", "Tyazo"] },
          { name: "Rurembo", cells: ["Gahondo", "Gitega", "Kirimbogo", "Murambi", "Mwana", "Rwaza"] },
          { name: "Shyira", cells: ["Cyimanzovu", "Kanyamitana", "Kintarure", "Mpinga", "Mutanda", "Shaki"] }
        ]
      },
      {
        name: "Nyamasheke",
        sectors: [
          { name: "Bushekeri", cells: ["Buvungira", "Mpumbu", "Ngoma", "Nyarusange"] },
          { name: "Bushenge", cells: ["Gasheke", "Impala", "Kagatamu", "Karusimbi"] },
          { name: "Cyato", cells: ["Bisumo", "Murambi", "Mutongo", "Rugari"] },
          { name: "Gihombo", cells: ["Butare", "Gitwa", "Jarama", "Kibingo", "Mubuga"] },
          { name: "Kagano", cells: ["Gako", "Mubumbano", "Ninzi", "Rwesero", "Shara"] },
          { name: "Kanjongo", cells: ["Kibogora", "Kigarama", "Kigoya", "Raro", "Susa"] },
          { name: "Karambi", cells: ["Gasovu", "Gitwe", "Kabuga", "Kagarama", "Rushyarara"] },
          { name: "Karengera", cells: ["Gasayo", "Gashashi", "Higiro", "Miko", "Mwezi"] },
          { name: "Kirimbi", cells: ["Cyimpindu", "Karengera", "Muhororo", "Nyarusange"] },
          { name: "Macuba", cells: ["Gatare", "Mutongo", "Nyakabingo", "Rugari", "Vugangoma"] },
          { name: "Mahembe", cells: ["Gisoke", "Kagarama", "Nyagatare", "Nyakavumu"] },
          { name: "Nyabitekeri", cells: ["Kigabiro", "Kinunga", "Mariba", "Muyange", "Ntango"] },
          { name: "Rangiro", cells: ["Banda", "Gakenke", "Jurwe", "Murambi"] },
          { name: "Ruharambuga", cells: ["Kanazi", "Ntendezi", "Save", "Wimana"] },
          { name: "Shangi", cells: ["Burimba", "Mataba", "Mugera", "Nyamugari", "Shangi"] }
        ]
      },
      {
        name: "Rubavu",
        sectors: [
          { name: "Bugeshi", cells: ["Buringo", "Butaka", "Hehu", "Kabumba", "Mutovu", "Nsherima", "Rusiza"] },
          { name: "Busasamana", cells: ["Gacurabwenge", "Gasiza", "Gihonga", "Kageshi", "Makoro", "Nyacyonga", "Rusura"] },
          { name: "Cyanzarwe", cells: ["Busigari", "Cyanzarwe", "Gora", "Kinyanzovu", "Makurizo", "Rwangara", "Rwanzekuma", "Ryabizige"] },
          { name: "Gisenyi", cells: ["Amahoro", "Bugoyi", "Kivumu", "Mbugangari", "Nengo", "Rubavu", "Umuganda"] },
          { name: "Kanama", cells: ["Kamuhoza", "Karambo", "Mahoko", "Musabike", "Nkomane", "Rusongati", "Yungwe"] },
          { name: "Kanzenze", cells: ["Kanyirabigogo", "Kirerema", "Muramba", "Nyamikongi", "Nyamirango", "Nyaruteme"] },
          { name: "Nyakiriba", cells: ["Bihungwe", "Kanyundo", "Micinyiro", "Mirindi", "Ndoranyi", "Rungu", "Rwanyakayaga"] },
          { name: "Nyamyumba", cells: ["Bisizi", "Gikombe", "Kanyefurwe", "Nyarushyamba"] },
          { name: "Rubavu", cells: ["Burushya", "Busoro", "Kinigi", "Kiraga", "Munanira", "Rubona"] },
          { name: "Rugerero", cells: ["Bahimba", "Gatovu", "Kavomo", "Kigarama", "Mukondo", "Nyundo", "Terimbere"] },
          { name: "Rutsiro", cells: ["Buhaza", "Burinda", "Byahi", "Gikombe", "Murambi", "Murara", "Rukoko"] },
          { name: "Rwaza", cells: ["Basa", "Gisa", "Kabilizi", "Muhira", "Rugerero", "Rushubi", "Rwaza"] }
        ]
      },
      {
        name: "Rutsiro",
        sectors: [
          { name: "Boneza", cells: ["Bushaka", "Kabihogo", "Nkira", "Remera"] },
          { name: "Gihango", cells: ["Bugina", "Congo-nil", "Mataba", "Murambi", "Ruhingo", "Shyembe", "Teba"] },
          { name: "Kigeyo", cells: ["Buhindure", "Nkora", "Nyagahinika", "Rukaragata"] },
          { name: "Kivumu", cells: ["Bunyoni", "Bunyunju", "Kabere", "Kabujenje", "Karambi", "Nganzo"] },
          { name: "Manihira", cells: ["Haniro", "Muyira", "Tangabo"] },
          { name: "Mukura", cells: ["Kabuga", "Kagano", "Kageyo", "Kagusa", "Karambo", "Mwendo"] },
          { name: "Murunda", cells: ["Kirwa", "Mburamazi", "Rugeyo", "Twabugezi"] },
          { name: "Musasa", cells: ["Gabiro", "Gisiza", "Murambi", "Nyarubuye"] },
          { name: "Mushonyi", cells: ["Biruyi", "Kaguriro", "Magaba", "Rurara"] },
          { name: "Mushubati", cells: ["Bumba", "Cyarusera", "Gitwa", "Mageragere", "Sure"] },
          { name: "Nyabirasi", cells: ["Busuku", "Cyivugiza", "Mubuga", "Ngoma", "Terimbere"] },
          { name: "Ruhango", cells: ["Gatare", "Gihira", "Kavumu", "Nyakarera", "Rugasa", "Rundoyi"] },
          { name: "Rusebeya", cells: ["Kabona", "Mberi", "Remera", "Ruronde"] }
        ]
      },
      {
        name: "Rusizi",
        sectors: [
          { name: "Bugarama", cells: ["Nyange", "Pera", "Ryankana"] },
          { name: "Butare", cells: ["Butanda", "Gatereri", "Nyamihanda", "Rwambogo"] },
          { name: "Bweyeye", cells: ["Gikungu", "Kiyabo", "Murwa", "Nyamuzi", "Rasano"] },
          { name: "Gashonga", cells: ["Birembo", "Buhokoro", "Kabakobwa", "Kacyuma", "Kamurehe", "Karemereye", "Muti", "Rusayo"] },
          { name: "Giheke", cells: ["Cyendajuru", "Gakomeye", "Giheke", "Kamashangi", "Kigenge", "Ntura", "Rwega", "Turambi"] },
          { name: "Gihundwe", cells: ["Burunga", "Gatsiro", "Gihaya", "Kagara", "Kamatita", "Shagasha"] },
          { name: "Gikundamvura", cells: ["Kizura", "Mpinga", "Nyamigina"] },
          { name: "Gitambi", cells: ["Cyingwa", "Gahungeri", "Hangabashi", "Mashesha"] },
          { name: "Kamembe", cells: ["Cyangugu", "Gihundwe", "Kamashangi", "Kamurera", "Ruganda"] },
          { name: "Muganza", cells: ["Cyarukara", "Gakoni", "Shara"] },
          { name: "Mururu", cells: ["Gahinga", "Kabahinda", "Kabasigirira", "Kagarama", "Karambi", "Miko", "Tara"] },
          { name: "Nkanka", cells: ["Gitwa", "Kamanyenga", "Kangazi", "Kinyaga", "Rugabano"] },
          { name: "Nkombo", cells: ["Bigoga", "Bugarura", "Ishywa", "Kamagimbo", "Rwenje"] },
          { name: "Nkungu", cells: ["Gatare", "Kiziguro", "Mataba", "Ryamuhirwa"] },
          { name: "Nyakabuye", cells: ["Gasebeya", "Gaseke", "Kamanu", "Kiziho", "Mashyuza", "Nyabintare"] },
          { name: "Nyakarenzo", cells: ["Gatare", "Kabagina", "Kabuye", "Kanoga", "Karangiro", "Murambi", "Rusambu"] },
          { name: "Nzahaha", cells: ["Butambamo", "Kigenge", "Murya", "Nyenji", "Rebero", "Rwinzuki"] },
          { name: "Rwimbogo", cells: ["Karenge", "Muhehwe", "Mushaka", "Rubugu", "Ruganda"] }
        ]
      }
    ]
  }
];