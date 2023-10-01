from http import HTTPStatus
from fastapi import APIRouter, Depends, Path
from app.models.database import get_db
from app.schemas.keyword import KeywordDTO
from app.services.keyword_service import *
from sqlalchemy.orm import Session

router = APIRouter(prefix="/info/keyword", tags=["keyword"])


@router.post("/stopword")
async def save_stopword(
    word: str, db: Session = Depends(get_db)
) -> Optional[dict | HTTPStatus]:
    try:
        return create_stopword(db, word)
    except Exception as e:
        raise HTTPStatus(status_code=500, detail=str(e))


@router.post("/keyword")
async def save_keyword(
    word: str, db: Session = Depends(get_db)
) -> Optional[dict | HTTPStatus]:
    try:
        create_keyword(db, word, 10)
        return {"status": "success"}
    except Exception as e:
        raise HTTPStatus(status_code=500, detail=str(e))


@router.get("")
async def get_wordcloud(db: Session = Depends(get_db)) -> list[KeywordDTO]:
    return get_keywords(db)


@router.get("/{keyword}")
async def get_keyword_wordcloud(
    keyword: str, db: Session = Depends(get_db)
) -> list[KeywordDTO]:
    try:
        return get_keyword_keywords(db, keyword)
    except Exception as e:
        raise HTTPStatus(status_code=500, detail=str(e))


@router.post("/tm")
async def save_textmining(db: Session = Depends(get_db)) -> Optional[dict | HTTPStatus]:
    try:
        create_textmining(db)
        return {"status": "success"}
    except Exception as e:
        raise HTTPStatus(status_code=500, detail=str(e))
