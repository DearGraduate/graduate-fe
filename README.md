## 🙋 팀원 소개

| <img src="https://github.com/joyeeon.png" width="80"/><br> 조희연
| <img src="https://github.com/Simmee02.png" width="80"/><br> 심지영
| <img src="https://github.com/PocheonLim.png" width="80"/><br> 임성훈
| <img src="https://github.com/shail1027.png" width="80"/><br> 이예빈



## 🖥️ 데모

🔗 [배포 링크](https://graduate-psbz6u7ba-joys-projects-a739eabd.vercel.app)

## 실행
npm start
---

## 🛠️ 기술 스택

| Frontend | Backend | 기타 |
|----------|---------|------|
| React / Vite | Node.js (Express) | Kakao SDK, html2pdf.js |
| TypeScript | (선택) Firebase / S3 업로드 | Tailwind CSS |

---
## 🪴 Branch Convention (GitHub Flow)
- main: 배포 가능한 브랜치, 항상 배포 가능한 상태를 유지
- feature/{description}: 새로운 기능을 개발하는 브랜치
- 예: feature/add-login-page

### Flow
1. main 브랜치는 최종
1. develop 브랜치에서 새로운 브랜치를 생성.
2. 작업을 완료하고 커밋 메시지에 맞게 커밋.
3. Pull Request를 생성 / 팀원들의 리뷰.
4. 리뷰가 완료되면 main 브랜치로 병합.
5. 병합 후, 필요시 배포.
예시:
bash # 새로운 기능 개발 git checkout -b feature/add-login-page # 작업 완료 후, main 브랜치로 병합 git checkout main git pull origin main git merge feature/add-login-page git push origin main git commit -m " "

feat :
chore :
fix :
build :
..
# 🎯 Branch Convention & Git Convention
## 🎯 Git Convention
- 🎉 Start: Start New Project [:tada]
- ✨ Feat: 새로운 기능을 추가 [:sparkles]
- 🐛 Fix: 버그 수정 [:bug]
- 🎨 Design: CSS 등 사용자 UI 디자인 변경 [:art]
- ♻️ Refactor: 코드 리팩토링 [:recycle]
- 🔧 Settings: Changing configuration files [:wrench]
- 🗃️ Comment: 필요한 주석 추가 및 변경 [:card_file_box]
- ➕ Dependency/Plugin: Add a dependency/plugin [:heavy_plus_sign]
- 📝 Docs: 문서 수정 [:memo]
- 🔀 Merge: Merge branches [:twisted_rightwards_arrows:]
- 🚀 Deploy: Deploying stuff [:rocket]
- 🚚 Rename: 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 [:truck]
- 🔥 Remove: 파일을 삭제하는 작업만 수행한 경우 [:fire]
- ⏪️ Revert: 전 버전으로 롤백 [:rewind]