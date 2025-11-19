/**
 * @file databases/migrations/20251119-01-fk_posts_user_id.js
 * @description Add fk on posts.user_id
 * 251117 v1.0.0 wook init
 */

// 테이블명
const tableName = 'posts';

// Constraint명
const constraintName = 'fk_posts_user_id';

// Constraint 정의
const options = {
  fields: ['user_id'],      // fk 부여할 컬럼
  type: 'foreign key',      // 사용할 constraint 종류
  name: constraintName, // constraint명 지정(constraint종류_테이블명_컬럼명)
  references: {             // 참조 설정
    table: 'users',         // 참조할 테이블
    field: 'id',            // 참조할 컬럼
  },
  onDelete: 'CASCADE',      // 참조 레코드가 삭제 시, posts의 레코드도 같이 삭제
}

/** @type {import('sequelize-cli').Migration} */
export default {
  // 마이그레이션 실행 시 호출되는 메소드 (스키마 생성)
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(tableName, options)
  },
  // 마이그레이션을 롤백 시 호출되는 메소드 (스키마 제거, 수정)
  async down (queryInterface, Sequelize) {
  await queryInterface.removeConstraint(tableName, constraintName)
  }
}