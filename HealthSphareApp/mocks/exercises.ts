export interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  caloriesBurned: number; // per session
  difficulty: "beginner" | "intermediate" | "advanced";
  imageUrl: string;
  linkYtb:string;
  videoUrl?: string;
  steps: string[];
  equipment: string[];
  muscleGroups: string[]; // sẽ là tiếng Việt
  isForWeightGain?: boolean;
  isForWeightLoss?: boolean;
}

export const exercises: Exercise[] = [
  {
    id: "1",
    name: "Ngồi xổm với trọng lượng cơ thể",
    description: "Bài tập cơ bản cho phần thân dưới, tác động đến nhiều nhóm cơ.",
    duration: 10,
    caloriesBurned: 100,
    difficulty: "beginner",
    imageUrl: "https://phunurovn.com/wp-content/uploads/2019/06/TPN-SKLD_0.17-CacTheYoga-30a-NgoiXom.Malasana-DQC.gif",
    linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Đứng thẳng, hai chân rộng bằng vai",
      "Hạ người xuống như ngồi trên ghế",
      "Giữ lưng thẳng và đầu gối không vượt quá mũi chân",
      "Trở lại tư thế đứng thẳng",
      "Lặp lại số lần mong muốn"
    ],
    equipment: ["none"],
    muscleGroups: ["đùi trước", "đùi sau", "mông", "cơ bụng"],
    isForWeightLoss: true,
    isForWeightGain: true
  },
  {
    id: "2",
    name: "Chống đẩy",
    description: "Bài tập thân trên cổ điển giúp phát triển ngực, vai và tay.",
    duration: 10,
    caloriesBurned: 100,
    difficulty: "intermediate",
    imageUrl: "https://cdnmedia.webthethao.vn/uploads/img/files/images/fullsize/2020/04/10/chay/push-ups-1.gif",
     linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Bắt đầu ở tư thế plank, hai tay rộng hơn vai một chút",
      "Hạ thấp cơ thể cho đến khi ngực gần chạm sàn",
      "Giữ cơ thể thành một đường thẳng",
      "Đẩy người lên trở lại vị trí ban đầu",
      "Lặp lại số lần mong muốn"
    ],
    equipment: ["none"],
    muscleGroups: ["ngực", "vai", "tay sau", "cơ bụng"],
    isForWeightGain: true
  },
  {
    id: "3",
    name: "Bật nhảy tại chỗ (Jumping Jacks)",
    description: "Bài tập cardio toàn thân giúp tăng nhịp tim và đốt cháy calo.",
    duration: 10,
    caloriesBurned: 100,
    difficulty: "beginner",
    imageUrl: "https://i.pinimg.com/originals/05/38/ca/0538ca92ee45429ee0df18d5a5799bfd.gif",
     linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Đứng thẳng, hai chân khép, hai tay xuôi theo thân",
      "Bật nhảy, đồng thời dang rộng hai chân và đưa hai tay qua đầu",
      "Nhảy lần nữa để trở về tư thế ban đầu",
      "Lặp lại động tác với tốc độ nhanh"
    ],
    equipment: ["none"],
    muscleGroups: ["toàn thân", "tim mạch"],
    isForWeightLoss: true
  },
  {
    id: "4",
    name: "Plank (Chống tay giữ thân người thẳng)",
    description: "Bài tập isometric cho cơ core giúp tăng sức mạnh và sự ổn định.",
    duration: 5,
    caloriesBurned: 40,
    difficulty: "beginner",
    imageUrl: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
     linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Bắt đầu ở tư thế chống đẩy nhưng chống bằng cẳng tay",
      "Giữ cơ thể thành một đường thẳng từ đầu đến gót chân",
      "Siết cơ bụng và giữ nguyên tư thế",
      "Giữ trong thời gian mong muốn"
    ],
    equipment: ["none"],
    muscleGroups: ["cơ bụng", "vai", "lưng"],
    isForWeightLoss: true,
    isForWeightGain: true
  },
  {
    id: "5",
    name: "Chùng chân (Lunges)",
    description: "Bài tập thân dưới giúp phát triển cơ chân và cải thiện thăng bằng.",
    duration: 10,
    caloriesBurned: 90,
    difficulty: "beginner",
    imageUrl: "https://www.thethaodaiviet.vn/upload/huong-dan-tap-lunges-co-ban.gif?v=1.0.0",
     linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Đứng thẳng, hai chân rộng bằng hông",
      "Bước một chân về phía trước",
      "Hạ thấp cơ thể cho đến khi cả hai đầu gối tạo thành góc 90 độ",
      "Đẩy người trở lại vị trí ban đầu",
      "Đổi chân và lặp lại"
    ],
    equipment: ["none"],
    muscleGroups: ["đùi trước", "đùi sau", "mông", "bắp chân"],
    isForWeightLoss: true
  },
  {
    id: "6",
    name: "Kéo tạ đơn (Dumbbell Rows)",
    description: "Bài tập kéo thân trên giúp tăng sức mạnh lưng.",
    duration: 15,
    caloriesBurned: 120,
    difficulty: "intermediate",
    imageUrl: "https://www.dinhduongthehinh.com/wp-content/uploads/2018/01/dumbbell-single-arm-row.gif",
     linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Cầm một quả tạ đơn ở mỗi tay",
      "Gập người về phía trước, hơi khuỵu gối",
      "Giữ lưng thẳng và siết cơ bụng",
      "Kéo tạ lên hai bên sườn",
      "Hạ tạ xuống có kiểm soát và lặp lại"
    ],
    equipment: ["tạ đơn"],
    muscleGroups: ["lưng", "tay trước", "vai"],
    isForWeightGain: true
  },
  {
    id: "7",
    name: "Burpees",
    description: "Bài tập toàn thân cường độ cao giúp tăng sức bền và sức mạnh.",
    duration: 10,
    caloriesBurned: 150,
    difficulty: "advanced",
    imageUrl: "https://i.pinimg.com/originals/9a/8a/ba/9a8abaa2c8c18f8288592299c6019bda.gif",
     linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Đứng thẳng",
      "Ngồi xổm xuống và đặt hai tay xuống sàn",
      "Đá hai chân ra sau vào tư thế plank",
      "Chống đẩy một cái (tùy chọn)",
      "Thu chân về tư thế ngồi xổm",
      "Bật nhảy lên cao, hai tay vươn qua đầu"
    ],
    equipment: ["none"],
    muscleGroups: ["toàn thân", "tim mạch"],
    isForWeightLoss: true
  },
  {
    id: "8",
    name: "Đẩy ngực với ghế (Bench Press)",
    description: "Bài tập sức mạnh cổ điển giúp phát triển cơ ngực.",
    duration: 15,
    caloriesBurned: 150,
    difficulty: "intermediate",
    imageUrl: "https://cdn.thehinh.com/2016/03/Close-grip-bench-press.gif",
     linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Nằm trên ghế, hai chân đặt vững trên sàn",
      "Nắm thanh tạ rộng hơn vai một chút",
      "Hạ thanh tạ xuống giữa ngực một cách kiểm soát",
      "Đẩy thanh tạ lên cho đến khi tay duỗi thẳng",
      "Lặp lại số lần mong muốn"
    ],
    equipment: ["ghế", "thanh tạ", "đĩa tạ"],
    muscleGroups: ["ngực", "vai", "tay sau"],
    isForWeightGain: true
  },
  // Thêm 10 bài tập mới
  {
    id: "9",
    name: "Leo núi (Mountain Climbers)",
    description: "Bài tập cardio giúp tăng nhịp tim và đốt cháy mỡ bụng.",
    duration: 5,
    caloriesBurned: 60,
    difficulty: "intermediate",
    imageUrl: "https://kenh14cdn.com/203336854389633024/2025/4/23/0b3cb465e4a3a09139819e0bce4036a0-17453302310871981131613-1745331585588-1745331585665411166595-1745392695432-17453926959721007640215.gif",
    linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Bắt đầu ở tư thế plank cao",
      "Kéo một đầu gối về phía ngực",
      "Đổi chân nhanh như đang chạy tại chỗ",
      "Tiếp tục luân phiên hai chân"
    ],
    equipment: ["none"],
    muscleGroups: ["cơ bụng", "vai", "tim mạch"],
    isForWeightLoss: true
  },
  {
    id: "10",
    name: "Gập bụng (Crunches)",
    description: "Bài tập cơ bụng truyền thống giúp săn chắc vùng bụng.",
    duration: 8,
    caloriesBurned: 60,
    difficulty: "beginner",
    imageUrl: "https://cdn.thehinh.com/2016/03/Bai-tap-gap-bung-nang-chan.gif",
     linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Nằm ngửa, đầu gối gập, bàn chân đặt trên sàn",
      "Đặt tay sau đầu hoặc trước ngực",
      "Nâng vai lên khỏi sàn, siết cơ bụng",
      "Hạ xuống và lặp lại"
    ],
    equipment: ["none"],
    muscleGroups: ["cơ bụng"],
    isForWeightLoss: true
  },
  {
    id: "11",
    name: "Đạp xe trên không (Bicycle Crunches)",
    description: "Bài tập bụng xiên giúp đốt cháy mỡ và tăng sức mạnh core.",
    duration: 8,
    caloriesBurned: 70,
    difficulty: "intermediate",
    imageUrl: "https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyOXRpbzZ6YnltbmJ3Z3Uya243bnhyNG8wZjY2ZXkwbTkwZDZnaG43ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/TMNCtgJGJnV8k/source.gif",
     linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Nằm ngửa, hai tay đặt sau đầu",
      "Nâng vai và chân lên khỏi sàn",
      "Đưa khuỷu tay phải chạm đầu gối trái, duỗi chân phải",
      "Đổi bên và lặp lại"
    ],
    equipment: ["none"],
    muscleGroups: ["cơ bụng", "bụng xiên"],
    isForWeightLoss: true
  },
  {
    id: "12",
    name: "Hít xà đơn (Pull-ups)",
    description: "Bài tập sức mạnh thân trên giúp phát triển lưng và tay.",
    duration: 10,
    caloriesBurned: 100,
    difficulty: "advanced",
    imageUrl: "https://ptfitness.vn/wp-content/uploads/2023/11/huong-dan-hit-xa-don-dung-cach.gif",
    linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Nắm thanh xà với hai tay rộng hơn vai",
      "Kéo người lên cho đến khi cằm vượt qua thanh xà",
      "Hạ người xuống có kiểm soát",
      "Lặp lại số lần mong muốn"
    ],
    equipment: ["xà đơn"],
    muscleGroups: ["lưng", "tay trước", "vai"],
    isForWeightGain: true
  },
  {
    id: "13",
    name: "Đá chân sau (Donkey Kicks)",
    description: "Bài tập mông giúp săn chắc và phát triển cơ mông.",
    duration: 8,
    caloriesBurned: 60,
    difficulty: "beginner",
    imageUrl: "https://i.makeagif.com/media/1-23-2017/pDfU6c.gif",
     linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Quỳ gối và chống hai tay xuống sàn",
      "Đá một chân lên cao về phía sau",
      "Hạ xuống và lặp lại",
      "Đổi chân"
    ],
    equipment: ["none"],
    muscleGroups: ["mông", "đùi sau"],
    isForWeightGain: true
  },
  {
    id: "14",
    name: "Nâng tạ vai (Shoulder Press)",
    description: "Bài tập vai giúp phát triển cơ vai và tay.",
    duration: 10,
    caloriesBurned: 90,
    difficulty: "intermediate",
    imageUrl: "https://www.thethaodaiviet.vn/upload/huong-dan-tap-overhead-shoulder-press.gif?v=1.0.0",
     linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Ngồi hoặc đứng, cầm tạ ở hai tay ngang vai",
      "Đẩy tạ lên trên đầu cho đến khi tay duỗi thẳng",
      "Hạ tạ xuống vị trí ban đầu",
      "Lặp lại"
    ],
    equipment: ["tạ đơn"],
    muscleGroups: ["vai", "tay sau"],
    isForWeightGain: true
  },
  {
    id: "15",
    name: "Nhảy dây (Jump Rope)",
    description: "Bài tập cardio giúp đốt cháy calo và tăng sức bền.",
    duration: 10,
    caloriesBurned: 120,
    difficulty: "beginner",
    imageUrl: "https://cdn-img.thethao247.vn/origin_640x0/storage/files/linhseo/2022/05/13/bat-ngo-voi-7-tac-dung-cua-nhay-day-20-phut-moi-ngay-136666.gif",
    linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Cầm hai đầu dây nhảy",
      "Nhảy qua dây bằng hai chân",
      "Tiếp tục nhảy với tốc độ phù hợp"
    ],
    equipment: ["dây nhảy"],
    muscleGroups: ["toàn thân", "tim mạch"],
    isForWeightLoss: true
  },
  {
    id: "16",
    name: "Squat với tạ (Dumbbell Squats)",
    description: "Bài tập squat nâng cao giúp tăng sức mạnh chân và mông.",
    duration: 12,
    caloriesBurned: 110,
    difficulty: "intermediate",
    imageUrl: "https://cdn.thehinh.com/2016/01/squat-ta-duoi-chan-dumbbell-goblet-squat.gif",
    linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Cầm tạ ở hai tay, đứng thẳng",
      "Hạ người xuống tư thế squat",
      "Đẩy người đứng lên",
      "Lặp lại"
    ],
    equipment: ["tạ đơn"],
    muscleGroups: ["đùi trước", "mông", "cơ bụng"],
    isForWeightGain: true
  },
  {
    id: "17",
    name: "Chống đẩy rộng tay (Wide Push-ups)",
    description: "Biến thể chống đẩy giúp tập trung vào cơ ngực ngoài.",
    duration: 8,
    caloriesBurned: 80,
    difficulty: "intermediate",
    imageUrl: "https://media.vienyhocungdung.vn/Upload/15/NewsAvatar/2016/Thang_7/042f906c-25fe-46a0-96e7-c2638043e165.jpg",
    linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Bắt đầu ở tư thế plank, hai tay đặt rộng hơn vai",
      "Hạ thấp cơ thể cho đến khi ngực gần chạm sàn",
      "Đẩy người lên trở lại vị trí ban đầu",
      "Lặp lại"
    ],
    equipment: ["none"],
    muscleGroups: ["ngực", "vai", "tay sau"],
    isForWeightGain: true
  },
  {
    id: "18",
    name: "Nâng chân nằm ngửa (Leg Raises)",
    description: "Bài tập bụng dưới giúp săn chắc vùng bụng.",
    duration: 8,
    caloriesBurned: 60,
    difficulty: "beginner",
    imageUrl: "https://kenh14cdn.com/203336854389633024/2025/6/14/201909061510511147-1749884992966775503921-1749885371633-17498853719541624347460-1749887937520-1749887937866663205374.gif",
    linkYtb: "https://www.youtube.com/shorts/nEvijszJOwo",
    steps: [
      "Nằm ngửa, hai tay đặt dọc theo thân",
      "Nâng hai chân lên vuông góc với sàn",
      "Hạ chân xuống gần sàn nhưng không chạm",
      "Lặp lại"
    ],
    equipment: ["none"],
    muscleGroups: ["cơ bụng dưới"],
    isForWeightLoss: true
  }
];